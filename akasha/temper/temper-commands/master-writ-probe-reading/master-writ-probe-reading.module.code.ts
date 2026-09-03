import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"
import { readInventoryDiagnostic } from "../inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"

const CONDITION_SCHEMA = z
  .object({
    conditionIndex: z.number(),
    condText: z.string(),
    current: z.number(),
    max: z.number(),
    complete: z.boolean(),
    masterItemId: z.number().optional(),
    materialItemId: z.number().optional(),
    craftingType: z.number().optional(),
    quality: z.number().optional(),
    templateId: z.number().optional(),
    setId: z.number().optional(),
    traitType: z.number().optional(),
    styleId: z.number().optional(),
    encodedAlchemyTraits: z.number().optional(),
  })
  .strict()

const STEP_SCHEMA = z
  .object({
    stepIndex: z.number(),
    ending: z.boolean(),
    numConditions: z.number(),
    conditions: luaArrayOrEmpty(CONDITION_SCHEMA),
  })
  .strict()

const QUEST_SCHEMA = z
  .object({
    questIndex: z.number(),
    name: z.string(),
    repeatType: z.number(),
    questType: z.number(),
    numSteps: z.number(),
    activeStepText: z.string(),
    steps: luaArrayOrEmpty(STEP_SCHEMA),
  })
  .strict()

export const PROBE_SCHEMA = z
  .object({
    timestamp: z.number(),
    quests: luaArrayOrEmpty(QUEST_SCHEMA),
  })
  .strict()

type MasterWritProbe = z.infer<typeof PROBE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastMasterWritProbe: PROBE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

export async function readMasterWritProbe(inventoryPath: string): Promise<MasterWritProbe> {
  return await readInventoryDiagnostic(
    inventoryPath,
    ACCOUNT_WIDE_SCHEMA,
    (wide) => wide.diagnostics?.lastMasterWritProbe,
    "no diagnostics.lastMasterWritProbe (have you run /tempermwprobe then /reloadui?)"
  )
}
