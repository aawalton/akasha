import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/command/argument/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/command/argument/pages/inventory-path.argument.ts"
import { json as jsonArgument } from "akasha/command/argument/pages/json.argument.ts"
import {
  answeredWith,
  asJson,
  DATA,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperInventoryRecordParity as page } from "akasha/command/pages/temper/inventory/record-parity/temper-inventory-record-parity.command.ts"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  allBagItems,
  explainCapabilities,
} from "akasha/temper/command/modules/inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import {
  differingBetween,
  type FreshInputs,
  freshVerdictFor,
  queuedVerdictsIn,
  type Verdict,
  verdictRecordedOn,
  verdictSaid,
} from "akasha/temper/command/modules/inventory-resolved-verdict-reading/inventory-resolved-verdict-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { instantOf } from "akasha/temper/items-core/modules/capture-instant/capture-instant.module.code.ts"

const NAMED = [jsonArgument, inventoryPathArgument, charactersPathArgument]

const INVENTORY_LUA = "TemperInventory.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const OUT_OF_COVERAGE = "OUT OF COVERAGE"

const UNDATED = "UNDATED"

const DISAGREEMENT = "DISAGREEMENT"

export interface StackReading {
  readonly itemId: number
  readonly itemName: string
  readonly recorded: Verdict
  readonly fresh: Verdict
  readonly resolvedAt: number
}

export interface RecordParityRow {
  readonly itemId: number
  readonly itemName: string
  readonly stacks: number
  readonly recorded: Verdict
  readonly fresh: Verdict
  readonly differing: readonly string[]
  readonly resolvedAt: number
}

export function rowsFrom(readings: readonly StackReading[]): readonly RecordParityRow[] {
  const byPair = new Map<string, RecordParityRow>()
  for (const one of readings) {
    const differing = differingBetween(one.recorded, one.fresh)
    if (differing.length === 0) continue
    const key = `${String(one.itemId)}|${verdictSaid(one.recorded)}|${verdictSaid(one.fresh)}`
    const held = byPair.get(key)
    if (held === undefined) {
      byPair.set(key, {
        itemId: one.itemId,
        itemName: one.itemName,
        stacks: 1,
        recorded: one.recorded,
        fresh: one.fresh,
        differing,
        resolvedAt: one.resolvedAt,
      })
      continue
    }
    byPair.set(key, {
      ...held,
      stacks: held.stacks + 1,
      resolvedAt: Math.max(held.resolvedAt, one.resolvedAt),
    })
  }
  return [...byPair.values()].sort((one, two) =>
    one.itemId === two.itemId ? two.stacks - one.stacks : one.itemId - two.itemId
  )
}

export interface Coverage {
  readonly items: number
  readonly stacks: number
  readonly recordedStacks: number
  readonly itemsCompared: number
  readonly itemsUncovered: number
  readonly itemsUndated: number
}

function shareSaid(part: number, whole: number): string {
  if (whole === 0) return "0.0%"
  return `${((part / whole) * 100).toFixed(1)}%`
}

export function coverageSaid(counted: Coverage): readonly string[] {
  return [
    `${String(counted.recordedStacks)} of ${String(counted.stacks)} stacks carry a record, ` +
      `which is ${shareSaid(counted.recordedStacks, counted.stacks)} of what is held`,
    `${String(counted.itemsCompared)} of ${String(counted.items)} items carry one and are ruled on here`,
  ]
}

export function uncoveredSaid(counted: Coverage): readonly string[] {
  if (counted.itemsUncovered === 0) {
    return [OUT_OF_COVERAGE, "  (none) every item held carries a record"]
  }
  return [
    OUT_OF_COVERAGE,
    `  ${String(counted.itemsUncovered)} items carry no record in any stack, and no row ` +
      "below counts one of them",
  ]
}

export function undatedSaid(counted: Coverage): readonly string[] {
  if (counted.itemsUndated === 0) {
    return [UNDATED, "  (none) every record says when the rules reached it"]
  }
  return [
    UNDATED,
    `  ${String(counted.itemsUndated)} items carry a record no run dated, and no row below ` +
      "counts one of them",
  ]
}

export function agreementSaid(items: number): string {
  if (items === 0) return "no item held carries a record, so nothing here was ruled on at all"
  return (
    "the record the addon wrote and a fresh reading reach one answer on all " +
    `${String(items)} items carrying a record`
  )
}

export function rowsSaid(
  rows: readonly RecordParityRow[],
  itemsCompared: number
): readonly string[] {
  if (rows.length === 0) return [DISAGREEMENT, `  (none) ${agreementSaid(itemsCompared)}`]
  return [
    DISAGREEMENT,
    ...rows.map((one) => {
      const stacks = one.stacks === 1 ? "1 stack" : `${String(one.stacks)} stacks`
      return (
        `  ${one.itemName} (${String(one.itemId)}) over ${stacks}   ${one.differing.join(", ")}\n` +
        `    recorded  ${verdictSaid(one.recorded)}  (resolved ${instantOf(one.resolvedAt)})\n` +
        `    fresh     ${verdictSaid(one.fresh)}`
      )
    }),
  ]
}

export interface RecordParityJson extends Coverage {
  readonly inventoryPath: string
  readonly rules: number
  readonly agreed: number
  readonly disagreed: number
  readonly rows: readonly RecordParityRow[]
}

function foundSaid(out: RecordParityJson): readonly string[] {
  if (out.disagreed === 0) return []
  return [
    `${String(out.disagreed)} of ${String(out.itemsCompared)} items carrying a record are ` +
      "decided differently by a fresh reading, and the rows name them",
  ]
}

export function answerFor(out: RecordParityJson, asOneJsonLine: boolean): Answer {
  const found = foundSaid(out)
  const code = found.length === 0 ? OK : DATA
  if (asOneJsonLine) return asJson(out, found, code)
  return answeredWith(
    [
      `record parity over ${out.inventoryPath}`,
      `${String(out.rules)} rules, ${String(out.items)} items in ${String(out.stacks)} stacks`,
      ...coverageSaid(out),
      "",
      ...uncoveredSaid(out),
      "",
      ...undatedSaid(out),
      "",
      ...rowsSaid(out.rows, out.itemsCompared),
    ],
    found,
    code
  )
}

export async function temperInventoryRecordParity(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

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

  try {
    const caps = await explainCapabilities()
    const db = caps.parseInventoryContent(content)
    const config = await caps.loadTemperInventoryConfigFromPath(inventoryPath)
    const characters = await caps.loadTemperCharactersFromPath(charactersPath)
    const charactersById = new Map<string, CharacterKnowledge>(
      characters.map((one) => [one.id, one])
    )
    const env = caps.buildCliEvalEnv({
      charactersById,
      characterPriority: config.characterPriority,
      wantedConsumables: config.wantedConsumables,
      wantedEquipment: config.wantedEquipment,
      wantedCompanionEquipment: config.wantedCompanionEquipment,
      db,
    })

    const held = allBagItems(caps, db)
    const factsOf = ({ item, location }: (typeof held)[number]) =>
      caps.cliItemFactsFromInventoryItem(item, caps.classifyItemToNodeIds(item), location)
    const inputs: FreshInputs = {
      orderedRules: config.orderedRules,
      itemRuleById: new Map(config.itemRules.map((one) => [one.itemId, one])),
      queuedById: queuedVerdictsIn(content),
      ctx: {
        env,
        stockGroupByRuleId: caps.computeStockGroups(config.orderedRules, held, factsOf, env),
      },
    }

    const readings: StackReading[] = []
    const itemIds = new Set<number>()
    const recordedItemIds = new Set<number>()
    const comparedItemIds = new Set<number>()
    let recordedStacks = 0
    for (const one of held) {
      itemIds.add(one.item.itemId)
      const recorded = verdictRecordedOn(one.item)
      if (recorded === undefined) continue
      recordedStacks++
      recordedItemIds.add(one.item.itemId)
      const resolvedAt = one.item.resolvedAt
      if (resolvedAt === undefined) continue
      comparedItemIds.add(one.item.itemId)
      readings.push({
        itemId: one.item.itemId,
        itemName: one.item.itemName,
        recorded,
        fresh: freshVerdictFor(one.item, factsOf(one), inputs),
        resolvedAt,
      })
    }

    const rows = rowsFrom(readings)
    const disagreed = new Set(rows.map((one) => one.itemId)).size
    const undated = [...recordedItemIds].filter((one) => !comparedItemIds.has(one)).length
    const counted: Coverage = {
      items: itemIds.size,
      stacks: held.length,
      recordedStacks,
      itemsCompared: comparedItemIds.size,
      itemsUncovered: itemIds.size - recordedItemIds.size,
      itemsUndated: undated,
    }
    const out: RecordParityJson = {
      ...counted,
      inventoryPath,
      rules: config.orderedRules.length,
      agreed: counted.itemsCompared - disagreed,
      disagreed,
      rows,
    }
    return answerFor(out, taken.json === true)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
