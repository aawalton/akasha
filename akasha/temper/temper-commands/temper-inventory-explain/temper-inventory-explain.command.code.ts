import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import {
  formatExplainWalk,
  type JsonOutput,
  type OutcomeJson,
  type RuleTraceRow,
  type TtcBreakdown,
} from "@akasha/temper-explain/explain-walk"
import {
  allBagItems,
  type CharacterKnowledge,
  type ExplainCapabilities,
  explainCapabilities,
  type IndeterminateReason,
  type InventoryItemData,
  type ItemFacts,
  type RejectionReason,
  type ResolvedInventoryItem,
  type RuleEvalResult,
  resolveItemFromInventory,
  type WalkOutcome,
} from "@tools/lib/temper-explain-code"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const CHARACTERS_PATH = "--characters-path"

const CHAR = "--char"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const MASTER = "master"

const TAKING_A_VALUE = [INVENTORY_PATH, CHARACTERS_PATH, CHAR]

export type Read =
  | {
      readonly named: string
      readonly inventoryPath: string | null
      readonly charactersPath: string | null
      readonly charId: string | null
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const held = new Map<string, string>()
  let named: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (TAKING_A_VALUE.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` takes a value, and none followed it`)
        continue
      }
      held.set(one, value)
      continue
    }
    if (one.startsWith("--")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${INVENTORY_PATH}\`, ` +
          `\`${CHARACTERS_PATH}\`, \`${CHAR}\` and \`${JSON_FLAG}\``
      )
      continue
    }
    if (named !== null) {
      refusals.push(`\`${one}\` follows the item already named, and one call traces one item`)
      continue
    }
    named = one
  }
  if (named === null) {
    refusals.push("this names no item — it takes an item id or a whole ESO item link")
  }
  if (refusals.length > 0 || named === null) return { refused: refusals }
  return {
    named,
    inventoryPath: held.get(INVENTORY_PATH) ?? null,
    charactersPath: held.get(CHARACTERS_PATH) ?? null,
    charId: held.get(CHAR) ?? null,
    json,
  }
}

function wholeNumberIn(said: string): number | null {
  if (!/^\d+$/.test(said)) return null
  const held = Number(said)
  return Number.isInteger(held) && held >= 0 ? held : null
}

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
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }

  const caps = await explainCapabilities()
  const itemId = wholeNumberIn(read.named) ?? caps.parseItemLink(read.named)?.itemId ?? null
  if (itemId === null) {
    return refused(`\`${read.named}\` reads as neither an item id nor an item link`, INPUT)
  }

  const root = given === undefined ? process.cwd() : resolve(given.root)
  const inventoryPath =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  const charactersPath =
    read.charactersPath === null
      ? savedVarsFile(CHARACTERS_LUA)
      : resolve(root, read.charactersPath)

  let content: string
  try {
    content = await readFile(inventoryPath, "utf8")
  } catch (thrown) {
    return refused(`${INVENTORY_LUA} at ${inventoryPath} would not open — ${whyOf(thrown)}`, DATA)
  }

  const db = caps.parseInventoryContent(content)
  if (read.charId !== null && db.locations[read.charId] === undefined) {
    const known = Object.keys(db.locations)
    return refused(
      `\`${CHAR} ${read.charId}\` names no scanned location — ${inventoryPath} holds ` +
        `${known.length === 0 ? "none" : known.join(", ")}`,
      INPUT
    )
  }

  const resolved = resolveItemFromInventory(caps, db, itemId, read.charId ?? undefined)
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

  if (read.json) return { report: [JSON.stringify(out)], refusals: [], code: 0 }
  return { report: formatExplainWalk(out).replace(/\n+$/, "").split("\n"), refusals: [], code: 0 }
}
