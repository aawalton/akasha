import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { char as charArgument } from "akasha/commands/arguments/pages/char.argument.ts"
import { charactersPath as charactersPathArgument } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { tracedItemId as tracedItemIdArgument } from "akasha/commands/arguments/pages/traced-item-id.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventoryParity as page } from "akasha/commands/pages/temper/inventory/parity/temper-inventory-parity.command.ts"
import type { CharacterKnowledge } from "akasha/temper/commands/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  allBagItems,
  explainCapabilities,
  resolveItemFromInventory,
} from "akasha/temper/commands/inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import {
  type MatchedRoute,
  type ParityAddonTrace,
  parityAddonTrace,
  parityRouting,
} from "akasha/temper/commands/inventory-parity-capabilities/inventory-parity-capabilities.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type {
  RuleEvalResult,
  WalkTrace,
} from "akasha/temper/items-rules-eval/eval-result/eval-result.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"

const NAMED = [inventoryPathArgument, charactersPathArgument, charArgument, tracedItemIdArgument]

const INVENTORY_LUA = "TemperInventory.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const ABSENT = "(absent)"

const NO_DIVERGENCE = "  (no divergence)"

const NOT_EVALUATED = "skip(not-evaluated)"

const UNKNOWN_CATEGORY = "(unknown)"

type DiffRow = { readonly field: string; readonly web: string; readonly addon: string }

type WalkDiffRow = {
  readonly index: number
  readonly categoryId: string
  readonly web: string
  readonly addon: string
}

type AddonVerdict =
  | { readonly kind: "matched"; readonly action: string }
  | { readonly kind: "rejected"; readonly reason: string; readonly detail?: string }
  | { readonly kind: "skipped" }

function numSaid(value: number | undefined): string {
  return value === undefined ? ABSENT : String(value)
}

function numbersAgree(web: number | undefined, addon: number | undefined): boolean {
  return (web ?? 0) === (addon ?? 0)
}

function inputsDiff(trace: ParityAddonTrace, facts: ItemFacts): readonly DiffRow[] {
  const addon = trace.signals
  const checks: readonly {
    readonly field: string
    readonly web: number | undefined
    readonly addon: number | undefined
  }[] = [
    { field: "itemType", web: facts.itemType, addon: addon.itemType },
    {
      field: "specializedItemType",
      web: facts.specializedItemType,
      addon: addon.specializedItemType,
    },
    { field: "filterType", web: facts.filterType, addon: addon.filterType },
    { field: "traitType", web: facts.traitType, addon: addon.traitType },
    { field: "equipType", web: facts.equipType, addon: addon.equipType },
    { field: "armorType", web: facts.armorType, addon: addon.armorType },
    { field: "weaponType", web: facts.weaponType, addon: addon.weaponType },
    { field: "quality", web: facts.quality, addon: addon.quality },
  ]
  const rows: DiffRow[] = []
  for (const check of checks) {
    if (numbersAgree(check.web, check.addon)) continue
    rows.push({ field: check.field, web: numSaid(check.web), addon: numSaid(check.addon) })
  }
  const chain = facts.categoryNodeIds ?? []
  const leaf = chain.length === 0 ? undefined : chain[chain.length - 1]
  if (leaf !== trace.classification.leafCategoryId) {
    rows.push({
      field: "leafCategoryId",
      web: leaf ?? ABSENT,
      addon: trace.classification.leafCategoryId,
    })
  }
  return rows
}

function addonVerdictSaid(one: AddonVerdict): string {
  if (one.kind === "matched") return `match(${one.action})`
  if (one.kind === "rejected") {
    return one.detail === undefined ? `skip(${one.reason})` : `skip(${one.reason}:${one.detail})`
  }
  return NOT_EVALUATED
}

function webVerdictSaid(one: RuleEvalResult): string {
  const verdict = one.verdict
  if (verdict.kind === "matched") return `match(${one.action})`
  if (verdict.kind === "indeterminate") return `indeterminate(${verdict.reason.kind})`
  switch (verdict.reason.kind) {
    case "category-mismatch":
      return "skip(category-mismatch)"
    case "condition-fail":
      return `skip(condition-fail:${verdict.reason.conditionKind})`
    case "container-skip":
      return "skip(container-skip)"
    case "destination-resolve-fail":
      return "skip(destination-resolve-fail)"
    default:
      return assertNever(verdict.reason as never)
  }
}

function verdictsDiffer(web: RuleEvalResult, addon: AddonVerdict): boolean {
  const webKind = web.verdict.kind
  const bothPassOver =
    addon.kind === "skipped" &&
    webKind === "rejected" &&
    web.verdict.reason.kind === "category-mismatch"
  if (bothPassOver) return false
  return webKind !== addon.kind
}

function addonByIndexIn(trace: ParityAddonTrace): ReadonlyMap<number, AddonVerdict> {
  const found = new Map<number, AddonVerdict>()
  const matched = trace.orderedWalk.matched
  if (matched !== undefined) found.set(matched.index, { kind: "matched", action: matched.action })
  for (const one of trace.orderedWalk.rejections) {
    found.set(one.index, { kind: "rejected", reason: one.reason, detail: one.detail })
  }
  return found
}

function walkDiff(
  trace: ParityAddonTrace,
  webTrace: WalkTrace,
  rules: readonly CompiledOrderedRule[]
): readonly WalkDiffRow[] {
  const addonByIndex = addonByIndexIn(trace)
  const webByIndex = new Map<number, RuleEvalResult>()
  let webMatchedIndex: number | undefined
  for (const one of webTrace.perRule) {
    webByIndex.set(one.index, one)
    if (one.verdict.kind === "matched" && webMatchedIndex === undefined) webMatchedIndex = one.index
  }
  const stops: number[] = []
  const addonMatchedIndex = trace.orderedWalk.matched?.index
  if (addonMatchedIndex !== undefined) stops.push(addonMatchedIndex)
  if (webMatchedIndex !== undefined) stops.push(webMatchedIndex)
  const cap = stops.length === 0 ? Number.POSITIVE_INFINITY : Math.min(...stops)

  const rows: WalkDiffRow[] = []
  const indices = [...new Set([...addonByIndex.keys(), ...webByIndex.keys()])]
    .filter((one) => one <= cap)
    .sort((a, b) => a - b)
  for (const index of indices) {
    const addon: AddonVerdict = addonByIndex.get(index) ?? { kind: "skipped" }
    const web = webByIndex.get(index)
    if (web === undefined) {
      if (addon.kind === "skipped") continue
      rows.push({
        index,
        categoryId: rules[index]?.categoryId ?? UNKNOWN_CATEGORY,
        web: NOT_EVALUATED,
        addon: addonVerdictSaid(addon),
      })
      continue
    }
    if (!verdictsDiffer(web, addon)) continue
    rows.push({
      index,
      categoryId: web.categoryId,
      web: webVerdictSaid(web),
      addon: addonVerdictSaid(addon),
    })
  }
  return rows
}

export function inputsSaid(rows: readonly DiffRow[]): readonly string[] {
  if (rows.length === 0) return ["INPUTS DIFF", NO_DIVERGENCE]
  return ["INPUTS DIFF", ...rows.map((one) => `  ${one.field}  web=${one.web}  addon=${one.addon}`)]
}

export function walkSaid(rows: readonly WalkDiffRow[]): readonly string[] {
  if (rows.length === 0) return ["WALK DIFF", NO_DIVERGENCE]
  return [
    "WALK DIFF",
    ...rows.map(
      (one) => `  rule ${String(one.index)} "${one.categoryId}"   web=${one.web} addon=${one.addon}`
    ),
  ]
}

export async function temperInventoryParity(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const itemId = taken.tracedItemId

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

  const [caps, addonTraces, routing] = await Promise.all([
    explainCapabilities(),
    parityAddonTrace(),
    parityRouting(),
  ])

  let trace: ParityAddonTrace
  try {
    trace = addonTraces.loadParityAddonTraceFromContent(content, itemId)
  } catch (thrown) {
    return refused(
      `${inventoryPath} holds no stored trace for item ${String(itemId)} — ${whyOf(thrown)}`,
      DATA
    )
  }

  const db = caps.parseInventoryContent(content)
  const resolved = resolveItemFromInventory(caps, db, itemId)
  if (resolved === undefined) {
    return refused(
      `item ${String(itemId)} is in the stored trace and in no bag scan of ` +
        `${inventoryPath}, so there is nothing fresh to compare it against`,
      DATA
    )
  }

  let webWalk: WalkTrace
  let facts: ItemFacts
  try {
    const { item, location } = resolved
    const config = await caps.loadTemperInventoryConfigFromPath(inventoryPath)
    const characters = await caps.loadTemperCharactersFromPath(charactersPath)
    const charactersById = new Map<string, CharacterKnowledge>(
      characters.map((one) => [one.id, one])
    )
    const env = caps.buildCliEvalEnv({
      charactersById,
      characterPriority: config.characterPriority,
      wantedConsumables: config.wantedConsumables,
    })
    facts = caps.cliItemFactsFromInventoryItem(item, caps.classifyItemToNodeIds(item), location)
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
    webWalk = caps.walkRules(config.orderedRules, facts, { env, stockGroupByRuleId })
    const inputRows = inputsDiff(trace, facts)
    const walkRows = walkDiff(trace, webWalk, config.orderedRules)
    const webMatch: MatchedRoute | undefined =
      webWalk.outcome.kind === "matched"
        ? routing.matchedRouteFrom(webWalk.outcome.action, webWalk.outcome.destination)
        : undefined
    const addonMatched = trace.orderedWalk.matched
    const addonMatch: MatchedRoute | undefined =
      addonMatched === undefined
        ? undefined
        : routing.matchedRouteFrom(addonMatched.action, addonMatched.destination)
    const routingDiff = routing.computeRoutingDiff(taken.char, item, webMatch, addonMatch)
    const report = [
      ...inputsSaid(inputRows),
      "",
      ...walkSaid(walkRows),
      "",
      ...routing.renderRoutingSection(routingDiff).replace(/\n+$/, "").split("\n"),
    ]
    const diverged = inputRows.length > 0 || walkRows.length > 0 || routingDiff.mismatch
    if (!diverged) return told(report)
    return {
      report,
      refusals: [
        `the addon's stored trace for item ${String(itemId)} and a fresh evaluation ` +
          "do not agree, and the rows above name where",
      ],
      code: DATA,
    }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
