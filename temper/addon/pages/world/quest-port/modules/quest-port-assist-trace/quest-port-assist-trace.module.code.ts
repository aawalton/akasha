import {
  type AssistedReading,
  type AssistNextEntry,
  keepLast,
  PORT_TRACE_CAP,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/world/quests/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const LATER_MS = 500

const TRACKER_HEADER = "ZO_FocusedQuestTrackerPanelContainerQuestContainerTrackedHeader1"

const TRACKER_PANEL = "ZO_FocusedQuestTrackerPanel"

let pendingBefore: AssistedReading | undefined

function assistedReading(this: void): AssistedReading {
  let journalIndex: number | undefined
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex++) {
    if (IsValidQuestIndex(questIndex) && GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex)) {
      journalIndex = questIndex
      break
    }
  }
  const header = GetControl<LabelControl>(TRACKER_HEADER)
  const panel = GetControl(TRACKER_PANEL)
  return {
    journalIndex,
    questName:
      journalIndex === undefined
        ? undefined
        : zo_strformat("<<1>>", GetJournalQuestName(journalIndex)),
    headerText: header === undefined ? undefined : header.GetText(),
    headerHidden: header === undefined ? undefined : header.IsHidden(),
    panelHidden: panel === undefined ? undefined : panel.IsHidden(),
  }
}

function readSafely(this: void): AssistedReading | undefined {
  try {
    return assistedReading()
  } catch {
    return undefined
  }
}

function recordBefore(this: void): undefined {
  pendingBefore = readSafely()
  return undefined
}

function recordAfter(this: void): undefined {
  try {
    const entry: AssistNextEntry = {
      at: GetTimeStamp(),
      character: zo_strformat("<<1>>", GetUnitName("player")),
      before: pendingBefore,
      after: readSafely(),
    }
    pendingBefore = undefined
    const sv = getSavedVariables()
    sv.assistNextTrace = keepLast(sv.assistNextTrace ?? [], entry, PORT_TRACE_CAP)
    zo_callLater(() => {
      entry.later = readSafely()
    }, LATER_MS)
  } catch {
    return undefined
  }
  return undefined
}

export function initQuestPortAssistTrace(this: void): undefined {
  try {
    ZO_PreHook(FOCUSED_QUEST_TRACKER, "AssistNext", (): undefined => {
      recordBefore()
      return undefined
    })
    SecurePostHook(FOCUSED_QUEST_TRACKER, "AssistNext", () => {
      recordAfter()
    })
  } catch {
    return undefined
  }
  return undefined
}
