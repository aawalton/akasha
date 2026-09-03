import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { readMasterWritProbe } from "../master-writ-probe-reading/master-writ-probe-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

type ProbeCondition = {
  readonly conditionIndex: number
  readonly condText: string
  readonly current: number
  readonly max: number
  readonly complete: boolean
  readonly masterItemId?: number
  readonly materialItemId?: number
  readonly craftingType?: number
  readonly quality?: number
  readonly templateId?: number
  readonly setId?: number
  readonly traitType?: number
  readonly styleId?: number
  readonly encodedAlchemyTraits?: number
}

type ProbeStep = {
  readonly stepIndex: number
  readonly ending: boolean
  readonly numConditions: number
  readonly conditions: readonly ProbeCondition[]
}

type ProbeQuest = {
  readonly questIndex: number
  readonly name: string
  readonly repeatType: number
  readonly questType: number
  readonly numSteps: number
  readonly activeStepText: string
  readonly steps: readonly ProbeStep[]
}

type MasterWritProbe = { readonly timestamp: number; readonly quests: readonly ProbeQuest[] }

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

export function probeSaid(probe: MasterWritProbe): readonly string[] {
  const lines: string[] = [
    `[master-writ probe @ ${probe.timestamp}] ${probe.quests.length} quest(s)`,
  ]
  for (const quest of probe.quests) {
    lines.push(
      `quest#${quest.questIndex} "${quest.name}" repeat=${quest.repeatType} ` +
        `type=${quest.questType} numSteps=${quest.numSteps}`
    )
    lines.push(`  activeStep="${quest.activeStepText}"`)
    for (const step of quest.steps) {
      lines.push(
        `  step#${step.stepIndex} ending=${step.ending ? "y" : "n"} ` +
          `numConditions=${step.numConditions}`
      )
      for (const one of step.conditions) {
        lines.push(
          `    cond#${one.conditionIndex} "${one.condText}" ${one.current}/${one.max} ` +
            `complete=${one.complete ? "y" : "n"}`
        )
        lines.push(
          `      masterItemId=${num(one.masterItemId)} ` +
            `materialItemId=${num(one.materialItemId)} ` +
            `craftingType=${num(one.craftingType)} quality=${num(one.quality)}`
        )
        lines.push(
          `      templateId=${num(one.templateId)} setId=${num(one.setId)} ` +
            `traitType=${num(one.traitType)} styleId=${num(one.styleId)} ` +
            `encodedAlchemyTraits=${num(one.encodedAlchemyTraits)}`
        )
      }
    }
  }
  return lines
}

export async function temperInventoryMasterWritProbe(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  try {
    const probe = (await readMasterWritProbe(at)) as MasterWritProbe
    if (read.json) return { report: [JSON.stringify(probe)], refusals: [], code: 0 }
    return { report: [...probeSaid(probe)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
