import { resolve } from "node:path"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { readInventoryFileArgs } from "akasha/commands/modules/inventory-file-arguing/inventory-file-arguing.module.code.ts"
import { numSaid } from "akasha/commands/modules/inventory-trace-saying/inventory-trace-saying.module.code.ts"
import { readMasterCraftTraces } from "akasha/temper/commands/master-craft-trace-reading/master-craft-trace-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_LUA = "TemperInventory.lua"

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

export function craftTraceSaid(traces: readonly MasterCraftTrace[]): readonly string[] {
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
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readInventoryFileArgs(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  try {
    const traces = (await readMasterCraftTraces(at)) as readonly MasterCraftTrace[]
    if (read.json) return { report: [JSON.stringify(traces)], refusals: [], code: 0 }
    return { report: [...craftTraceSaid(traces)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
