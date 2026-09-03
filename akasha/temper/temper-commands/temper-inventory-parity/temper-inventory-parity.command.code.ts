import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  allBagItems,
  type CharacterKnowledge,
  type CompiledOrderedRule,
  explainCapabilities,
  type ItemFacts,
  type RuleEvalResult,
  resolveItemFromInventory,
  type WalkTrace,
} from "../inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import {
  type MatchedRoute,
  type ParityAddonTrace,
  parityAddonTrace,
  parityRouting,
} from "../inventory-parity-capabilities/inventory-parity-capabilities.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const CHAR = "--char"

const INVENTORY_PATH = "--inventory-path"

const CHARACTERS_PATH = "--characters-path"

const INVENTORY_LUA = "TemperInventory.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const TAKING_A_VALUE = [CHAR, INVENTORY_PATH, CHARACTERS_PATH]

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

export type Read =
  | {
      readonly itemId: number
      readonly charId: string
      readonly inventoryPath: string | null
      readonly charactersPath: string | null
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const held = new Map<string, string>()
  let named: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
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
        `\`${one}\` is no flag this takes — it takes \`${CHAR}\`, ` +
          `\`${INVENTORY_PATH}\` and \`${CHARACTERS_PATH}\``
      )
      continue
    }
    if (named !== null) {
      refusals.push(`\`${one}\` follows the item already named, and one call compares one item`)
      continue
    }
    named = one
  }
  if (named === null) refusals.push("this names no item — it takes a bare item id")
  else if (!/^\d+$/.test(named)) {
    refusals.push(`\`${named}\` is no whole item id, and a stored trace is reached by id`)
  }
  const charId = held.get(CHAR)
  if (charId === undefined) {
    refusals.push(
      `\`${CHAR}\` names the character the stored trace was captured from, and nothing said it`
    )
  }
  if (refusals.length > 0 || named === null || charId === undefined) return { refused: refusals }
  return {
    itemId: Number(named),
    charId,
    inventoryPath: held.get(INVENTORY_PATH) ?? null,
    charactersPath: held.get(CHARACTERS_PATH) ?? null,
  }
}

function numSaid(value: number | undefined): string {
  return value === undefined ? ABSENT : String(value)
}

function numbersAgree(web: number | undefined, addon: number | undefined): boolean {
  return (web ?? 0) === (addon ?? 0)
}

export function inputsDiff(trace: ParityAddonTrace, facts: ItemFacts): readonly DiffRow[] {
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

export function walkDiff(
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
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }

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

  const [caps, addonTraces, routing] = await Promise.all([
    explainCapabilities(),
    parityAddonTrace(),
    parityRouting(),
  ])

  let trace: ParityAddonTrace
  try {
    trace = addonTraces.loadParityAddonTraceFromContent(content, read.itemId)
  } catch (thrown) {
    return refused(
      `${inventoryPath} holds no stored trace for item ${String(read.itemId)} — ${whyOf(thrown)}`,
      DATA
    )
  }

  const db = caps.parseInventoryContent(content)
  const resolved = resolveItemFromInventory(caps, db, read.itemId)
  if (resolved === undefined) {
    return refused(
      `item ${String(read.itemId)} stands in the stored trace and in no bag scan of ` +
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
    const routingDiff = routing.computeRoutingDiff(read.charId, item, webMatch, addonMatch)
    const report = [
      ...inputsSaid(inputRows),
      "",
      ...walkSaid(walkRows),
      "",
      ...routing.renderRoutingSection(routingDiff).replace(/\n+$/, "").split("\n"),
    ]
    const diverged = inputRows.length > 0 || walkRows.length > 0 || routingDiff.mismatch
    if (!diverged) return { report, refusals: [], code: 0 }
    return {
      report,
      refusals: [
        `the addon's stored trace for item ${String(read.itemId)} and a fresh evaluation ` +
          "do not agree, and the rows above name where",
      ],
      code: DATA,
    }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
