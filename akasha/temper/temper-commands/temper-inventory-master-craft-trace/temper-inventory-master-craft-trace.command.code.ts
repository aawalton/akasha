import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { readMasterCraftTraces } from "../master-craft-trace-reading/master-craft-trace-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

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

export type Read =
  | { readonly inventoryPath: string | null; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("--")) {
        refusals.push(`\`${INVENTORY_PATH}\` names the file to read, and no file followed it`)
        continue
      }
      inventoryPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, json }
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
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
      `  verify: resultLink=${str(one.resultLink)} resultSetId=${num(one.resultSetId)} ` +
        `resultTrait=${num(one.resultTrait)} maxIter=${num(one.maxIter)}`
    )
    if (one.existingMatchQuality !== undefined || one.existingMatchLink !== undefined) {
      lines.push(
        `  idempotency: existingQuality=${num(one.existingMatchQuality)} ` +
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
  const read = readIn(argv)
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
