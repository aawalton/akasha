import {
  asRecord,
  asRecordOrEmpty,
} from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  cleanAccountCompletionInput,
  cleanCharacterCompletionInput,
  cleanCompanionCompletionInput,
} from "akasha/temper/capture/completion-import/modules/completion-input-schema/completion-input-schema.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  type AccountCompletion,
  accountCompletionSchema,
  type CompanionCompletion,
  characterCompletionSchema,
  companionCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { z } from "zod"

const addonCharacterRecordSchema = characterCompletionSchema.extend({
  name: z.string().optional(),
  priorityOrder: z.number().optional(),
})

type AddonCharacterRecord = z.infer<typeof addonCharacterRecordSchema>

interface SavedVariablesDiagnostics {
  readonly knownSectionCount: number
  readonly skippedCharacters: number
  readonly skippedCompanions: number
}

interface ParsedSavedVariables {
  account: AccountCompletion | undefined
  characters: Record<string, AddonCharacterRecord>
  companions: Record<string, { companionId: string; data: CompanionCompletion }>
  readonly diagnostics: SavedVariablesDiagnostics
}

function unreadRecordWhy(what: string, why: string): string {
  return `the saved variables hold ${what} the completion record does not describe, so nothing is imported: ${why}`
}

function normalizeLuaNumericKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (isRecord(value)) {
      result[key] = normalizeLuaNumericKeys(value)
    } else {
      result[key] = value
    }
  }
  return result
}

function parsedAs<T>(shape: z.ZodType<T>, what: string, value: unknown): T {
  const parsed = shape.safeParse(value)
  if (!parsed.success) throw new Error(unreadRecordWhy(what, parsed.error.message))
  return parsed.data
}

const COMPANIONS_VARIABLES_NAME = "TemperCompanions_SavedVariables"

function companionsTableIn(content: string): Record<string, unknown> | undefined {
  if (!content.includes(COMPANIONS_VARIABLES_NAME)) return undefined
  const root = parseLuaSavedVariablesFile(content, COMPANIONS_VARIABLES_NAME)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) return undefined
  return asRecord(readFirstAccountWide(defaultTable)?.companions)
}

export function parseSavedVariablesContent(
  content: string,
  companionIdByDefId: (defId: number) => string | undefined
): ParsedSavedVariables {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, "TemperCharacters_SavedVariables")
  } catch {
    root = parseLuaSavedVariablesFile(content, "Temper_SavedVariables")
  }

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }

  let skippedCharacters = 0
  let skippedCompanions = 0

  const accountRecord = asRecord(accountWide.account)
  const account = accountRecord
    ? parsedAs(
        accountCompletionSchema,
        "an account",
        cleanAccountCompletionInput(normalizeLuaNumericKeys(accountRecord))
      )
    : undefined

  const charactersTable = asRecord(accountWide.characters)
  const characters: Record<string, AddonCharacterRecord> = {}

  if (charactersTable) {
    for (const [esoCharacterId, charEntry] of Object.entries(charactersTable)) {
      const charRecord = asRecord(charEntry)
      if (!charRecord) {
        skippedCharacters++
        continue
      }

      characters[esoCharacterId] = parsedAs(
        addonCharacterRecordSchema,
        `character ${esoCharacterId}`,
        cleanCharacterCompletionInput(normalizeLuaNumericKeys(charRecord))
      )
    }
  }

  const companionsRecord = companionsTableIn(content) ?? asRecord(accountWide.companions)
  const companionsTable = companionsRecord ?? asRecordOrEmpty(undefined)
  const companions: Record<string, { companionId: string; data: CompanionCompletion }> = {}

  for (const [defIdKey, companionEntry] of Object.entries(companionsTable)) {
    const rec = asRecord(companionEntry)
    if (!rec) {
      skippedCompanions++
      continue
    }

    const defId = parseInt(defIdKey, 10)
    const companionId = companionIdByDefId(defId)
    if (companionId == null) {
      skippedCompanions++
      continue
    }

    companions[defIdKey] = {
      companionId,
      data: parsedAs(
        companionCompletionSchema,
        `companion ${companionId}`,
        cleanCompanionCompletionInput(normalizeLuaNumericKeys(rec))
      ),
    }
  }

  const knownSectionCount =
    (accountRecord ? 1 : 0) + (charactersTable ? 1 : 0) + (companionsRecord ? 1 : 0)

  return {
    account,
    characters,
    companions,
    diagnostics: { knownSectionCount, skippedCharacters, skippedCompanions },
  }
}
