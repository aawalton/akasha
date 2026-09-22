import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/command/argument/pages/inventory-path.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { numSaid } from "akasha/command/modules/inventory-trace-saying/inventory-trace-saying.module.code.ts"
import { temperInventoryMasterCraftTrace as page } from "akasha/command/pages/temper/inventory/master/craft-trace/temper-inventory-master-craft-trace.command.ts"
import { readMasterCraftTraces } from "akasha/temper/command/modules/master-craft-trace-reading/master-craft-trace-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperItems.lua"

const NAMED = [json, inventoryPath]

type MasterCraftTrace = {
  readonly timestamp: number
  readonly craftType: number
  readonly setId: number
  readonly templateId: number
  readonly traitType: number
  readonly mode: number
  readonly interactionType: number
  readonly atConsolidated: boolean
  readonly basePattern: number
  readonly resolvedPattern: number
  readonly materialIndex: number
  readonly numMats: number
  readonly styleId: number
  readonly traitIndex: number
  readonly resultLink?: string
  readonly resultSetId?: number
  readonly resultTrait?: number
  readonly maxIter?: number
  readonly existingMatchQuality?: number
  readonly existingMatchLink?: string
  readonly outcome: string
}

function str(value: string | undefined): string {
  return value === undefined ? "nil" : `"${value}"`
}

function craftTraceSaid(traces: readonly MasterCraftTrace[]): readonly string[] {
  const lines: string[] = [`[master craft traces] ${traces.length} entry(ies), oldest first`]
  for (const one of traces) {
    lines.push(
      `@${one.timestamp} OUTCOME=${one.outcome} craftType=${one.craftType} setId=${one.setId} ` +
        `templateId=${one.templateId} traitType=${one.traitType}`
    )
    lines.push(
      `  station: mode=${one.mode} interactionType=${one.interactionType} ` +
        `atConsolidated=${one.atConsolidated ? "y" : "n"}`
    )
    lines.push(
      `  pattern: base=${one.basePattern} resolved=${one.resolvedPattern} ` +
        `mat=${one.materialIndex} num=${one.numMats} style=${one.styleId} ` +
        `traitIndex=${one.traitIndex}`
    )
    lines.push(
      `  verify: resultLink=${str(one.resultLink)} resultSetId=${numSaid(one.resultSetId)} ` +
        `resultTrait=${numSaid(one.resultTrait)} maxIter=${numSaid(one.maxIter)}`
    )
    if (one.existingMatchQuality !== undefined || one.existingMatchLink !== undefined) {
      lines.push(
        `  idempotency: existingQuality=${numSaid(one.existingMatchQuality)} ` +
          `existingLink=${str(one.existingMatchLink)}`
      )
    }
  }
  return lines
}

export async function temperInventoryMasterCraftTrace(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const at =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(given.root, taken.inventoryPath)
  try {
    const traces = (await readMasterCraftTraces(at)) as readonly MasterCraftTrace[]
    if (taken.json) return asJson(traces)
    return told([...craftTraceSaid(traces)])
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
