import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  asJson,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { numSaid } from "akasha/commands/modules/inventory-trace-saying/inventory-trace-saying.module.code.ts"
import { temperInventoryMasterWritProbe as page } from "akasha/commands/pages/temper/inventory/master/writ-probe/temper-inventory-master-writ-probe.command.ts"
import { readMasterWritProbe } from "akasha/temper/commands/master-writ-probe-reading/master-writ-probe-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperInventory.lua"

const NAMED = [json, inventoryPath]

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

function probeSaid(probe: MasterWritProbe): readonly string[] {
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
          `      masterItemId=${numSaid(one.masterItemId)} ` +
            `materialItemId=${numSaid(one.materialItemId)} ` +
            `craftingType=${numSaid(one.craftingType)} quality=${numSaid(one.quality)}`
        )
        lines.push(
          `      templateId=${numSaid(one.templateId)} setId=${numSaid(one.setId)} ` +
            `traitType=${numSaid(one.traitType)} styleId=${numSaid(one.styleId)} ` +
            `encodedAlchemyTraits=${numSaid(one.encodedAlchemyTraits)}`
        )
      }
    }
  }
  return lines
}

export async function temperInventoryMasterWritProbe(
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
    const probe = (await readMasterWritProbe(at)) as MasterWritProbe
    if (taken.json) return asJson(probe)
    return told([...probeSaid(probe)])
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
