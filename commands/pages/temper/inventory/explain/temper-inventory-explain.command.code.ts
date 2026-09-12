import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { char as charArgument } from "akasha/commands/arguments/pages/char.argument.ts"
import { charactersPath as charactersPathArgument } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { item as itemArgument } from "akasha/commands/arguments/pages/item.argument.ts"
import { json as jsonArgument } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventoryExplain as page } from "akasha/commands/pages/temper/inventory/explain/temper-inventory-explain.command.ts"
import type { CharacterKnowledge } from "akasha/temper/commands/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  allBagItems,
  type ExplainCapabilities,
  explainCapabilities,
  type ResolvedInventoryItem,
  resolveItemFromInventory,
} from "akasha/temper/commands/inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import {
  formatExplainWalk,
  type JsonOutput,
  type OutcomeJson,
  type RuleTraceRow,
  type TtcBreakdown,
} from "akasha/temper/explain/explain-walk/explain-walk.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import type {
  IndeterminateReason,
  RejectionReason,
  RuleEvalResult,
  WalkOutcome,
} from "akasha/temper/items-rules-eval/eval-result/eval-result.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"
import { wholeNumberIn } from "akasha/utils/narrow/whole-number-in/whole-number-in.module.code.ts"

const NAMED = [
  jsonArgument,
  inventoryPathArgument,
  charactersPathArgument,
  charArgument,
  itemArgument,
]

const CHAR = charArgument.said

const INVENTORY_LUA = "TemperInventory.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const MASTER = "master"

function rejectionSaid(reason: RejectionReason): string {
  if (reason.kind === "category-mismatch") {
    return `category-mismatch (rule.categoryId=${reason.ruleCategoryId})`
  }
  if (reason.kind === "condition-fail") {
    return reason.detail === undefined
      ? `condition-fail:${reason.conditionKind}`
      : `condition-fail:${reason.conditionKind} (${reason.detail})`
  }
  if (reason.kind === "container-skip") {
    return reason.detail === undefined ? "container-skip" : `container-skip (${reason.detail})`
  }
  return reason.detail === undefined
    ? "destination-resolve-fail"
    : `destination-resolve-fail (${reason.detail})`
}

function indeterminateSaid(reason: IndeterminateReason): string {
  if (reason.kind === "category-unknown") {
    return `category-unknown (missing=${reason.missingSignal})`
  }
  if (reason.kind === "condition-unknown") {
    return `condition-unknown:${reason.conditionKind} (missing=${reason.missingSignal})`
  }
  if (reason.kind === "condition-misshapen") {
    return `condition-misshapen:${reason.conditionKind} (held=${reason.held}, ${reason.why})`
  }
  return reason.detail === undefined
    ? "destination-unknown"
    : `destination-unknown (${reason.detail})`
}

export function rowOf(one: RuleEvalResult): RuleTraceRow {
  let verdict: RuleTraceRow["verdict"] = "matched"
  let verdictDetail: string | null = null
  if (one.verdict.kind === "rejected") {
    verdict = "rejected"
    verdictDetail = rejectionSaid(one.verdict.reason)
  } else if (one.verdict.kind === "indeterminate") {
    verdict = "indeterminate"
    verdictDetail = indeterminateSaid(one.verdict.reason)
  }
  return {
    index: one.index,
    ruleId: one.ruleId ?? null,
    categoryId: one.categoryId,
    action: one.action,
    destination: one.destination ?? null,
    verdict,
    verdictDetail,
    resolvedDestination: one.resolvedDestination ?? null,
  }
}

export function outcomeOf(outcome: WalkOutcome): OutcomeJson {
  if (outcome.kind === "matched") {
    return {
      kind: "matched",
      action: outcome.action,
      destination: outcome.destination ?? null,
      label: outcome.label,
      indeterminateRules: [],
    }
  }
  if (outcome.kind === "implicit-terminal") {
    return {
      kind: "implicit-terminal",
      action: outcome.action,
      destination: null,
      label: outcome.label,
      indeterminateRules: [],
    }
  }
  return {
    kind: "indeterminate",
    action: outcome.provisionalMatch?.action ?? null,
    destination: outcome.provisionalMatch?.destination ?? null,
    label: outcome.provisionalMatch?.label ?? null,
    indeterminateRules: outcome.indeterminateRules.map(rowOf),
  }
}

function ttcOf(item: InventoryItemData): TtcBreakdown {
  return {
    saleAvg: item.saleAvg ?? null,
    minPrice: item.minPrice ?? null,
    amountCount: item.amountCount ?? null,
    saleAmountCount: item.saleAmountCount ?? null,
    estimatedValue: item.estimatedValue ?? null,
    merchantValue: item.merchantValue ?? null,
    replacementCost: item.replacementCost ?? null,
  }
}

export function itemKeySaid(facts: ItemFacts): string | null {
  const key = facts.itemKey
  if (key === undefined) return null
  if (key.kind === "recipe") return `recipe:${String(key.resultItemId)}`
  if (key.kind === "motif") {
    return `motif:${String(key.styleId)}:${key.chapterId === null ? MASTER : String(key.chapterId)}`
  }
  if (key.kind === "script") return `script:${String(key.scriptId)}`
  return `consumable:${String(key.itemId)}`
}

async function walkedFor(
  caps: ExplainCapabilities,
  resolved: ResolvedInventoryItem,
  db: ReturnType<ExplainCapabilities["parseInventoryContent"]>,
  paths: { readonly inventoryPath: string; readonly charactersPath: string }
): Promise<JsonOutput> {
  const config = await caps.loadTemperInventoryConfigFromPath(paths.inventoryPath)
  const characters = await caps.loadTemperCharactersFromPath(paths.charactersPath)
  const charactersById = new Map<string, CharacterKnowledge>(characters.map((one) => [one.id, one]))
  const env = caps.buildCliEvalEnv({
    charactersById,
    characterPriority: config.characterPriority,
    wantedConsumables: config.wantedConsumables,
  })
  const { item, location } = resolved
  const nodeIds = caps.classifyItemToNodeIds(item)
  const facts = caps.cliItemFactsFromInventoryItem(item, nodeIds, location)
  const stockGroupByRuleId = caps.computeStockGroups(
    config.orderedRules,
    allBagItems(caps, db),
    ({ item: stockItem, location: stockLocation }) =>
      caps.cliItemFactsFromInventoryItem(
        stockItem,
        caps.classifyItemToNodeIds(stockItem),
        stockLocation
      ),
    env
  )
  const trace = caps.walkRules(config.orderedRules, facts, { env, stockGroupByRuleId })
  return {
    itemId: item.itemId,
    itemName: item.itemName,
    itemLink: item.itemLink,
    categoryNodeIds: facts.categoryNodeIds ?? null,
    itemKey: itemKeySaid(facts),
    ttc: ttcOf(item),
    perRule: trace.perRule.map(rowOf),
    outcome: outcomeOf(trace.outcome),
  }
}

export async function temperInventoryExplain(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const caps = await explainCapabilities()
  const itemId = wholeNumberIn(taken.item) ?? caps.parseItemLink(taken.item)?.itemId ?? null
  if (itemId === null) {
    return refused(`\`${taken.item}\` reads as neither an item id nor an item link`, INPUT)
  }

  const root = resolve(given.root)
  const inventoryPath =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(root, taken.inventoryPath)
  const charactersPath =
    taken.charactersPath === undefined
      ? savedVarsFile(CHARACTERS_LUA)
      : resolve(root, taken.charactersPath)

  let content: string
  try {
    content = await readFile(inventoryPath, "utf8")
  } catch (thrown) {
    return refused(`${INVENTORY_LUA} at ${inventoryPath} would not open — ${whyOf(thrown)}`, DATA)
  }

  const db = caps.parseInventoryContent(content)
  if (taken.char !== undefined && db.locations[taken.char] === undefined) {
    const known = Object.keys(db.locations)
    return refused(
      `\`${CHAR} ${taken.char}\` names no scanned location — ${inventoryPath} holds ` +
        `${known.length === 0 ? "none" : known.join(", ")}`,
      INPUT
    )
  }

  const resolved = resolveItemFromInventory(caps, db, itemId, taken.char)
  if (resolved === undefined) {
    return refused(
      `no scan in ${inventoryPath} holds item ${String(itemId)}, so there is no walk to trace`,
      DATA
    )
  }

  let out: JsonOutput
  try {
    out = await walkedFor(caps, resolved, db, { inventoryPath, charactersPath })
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }

  if (taken.json) return asJson(out)
  return told(formatExplainWalk(out).replace(/\n+$/, "").split("\n"))
}
