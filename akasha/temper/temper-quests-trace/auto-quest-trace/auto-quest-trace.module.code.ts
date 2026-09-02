import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"

const TRACE_OPTION = z
  .object({
    index: z.number(),
    optionType: z.number(),
    optionTypeName: z.string().optional(),
    kind: z.string(),
    important: z.boolean(),
    chosenBefore: z.boolean(),
    text: z.string(),
  })
  .strict()

const MENU_ENTRY = z
  .object({
    kind: z.literal("menu"),
    at: z.number(),
    interactionType: z.number(),
    interactionTypeName: z.string().optional(),
    offerPending: z.boolean(),
    pendingCompletion: z.boolean(),
    options: luaArrayOrEmpty(TRACE_OPTION),
    decision: z.string(),
  })
  .strict()

const ACTION_ENTRY = z
  .object({
    kind: z.literal("action"),
    at: z.number(),
    action: z.string(),
  })
  .strict()

const COMPLETE_DIALOG_ENTRY = z
  .object({
    kind: z.literal("complete-dialog"),
    at: z.number(),
    journalIndex: z.number(),
    numRewards: z.number(),
  })
  .strict()

export const AUTO_QUEST_TRACE_ENTRY = z.discriminatedUnion("kind", [
  MENU_ENTRY,
  ACTION_ENTRY,
  COMPLETE_DIALOG_ENTRY,
])

const ACCOUNT_WIDE = z
  .object({
    autoQuestDebugTrace: luaArrayOrEmpty(AUTO_QUEST_TRACE_ENTRY).optional(),
  })
  .passthrough()

export const TEMPER_QUESTS_SAVED_VARIABLES = savedVariablesRootSchema(ACCOUNT_WIDE)

export type AutoQuestTraceEntry = z.infer<typeof AUTO_QUEST_TRACE_ENTRY>
export type TemperQuestsSavedVariables = z.infer<typeof TEMPER_QUESTS_SAVED_VARIABLES>
