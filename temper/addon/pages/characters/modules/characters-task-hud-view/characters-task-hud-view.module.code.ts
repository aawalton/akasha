import { getActiveQuests } from "akasha/temper/addon/pages/characters/modules/characters-active-quests/characters-active-quests.module.code.ts"
import {
  getContentContainer,
  getEmptyLabel,
  getHudFragment,
  getHudWindow,
  getRowPool,
  HUD_NAME,
  lastRefreshExit,
  lastSyncedAssistedName,
  refreshesNoted,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-state/characters-task-hud-state.module.code.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-characters-task-hud-view-global/temper-characters-task-hud-view-global.type-declaration.d.ts"

function questFocuses(this: void): TemperCharactersTaskHudQuestFocus[] {
  const focuses: TemperCharactersTaskHudQuestFocus[] = []
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex += 1) {
    if (!IsValidQuestIndex(questIndex)) continue
    focuses.push({
      journalIndex: questIndex,
      name: GetJournalQuestName(questIndex),
      assistedWithZero: GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex, 0),
      assistedWithNil: GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex),
    })
  }
  return focuses
}

type ColoredLabel = LabelControl & {
  GetColor: () => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
}

function labelsOf(this: void, row: Control): TemperCharactersTaskHudLabelDrawn[] {
  const labels: TemperCharactersTaskHudLabelDrawn[] = []
  for (let index = 1; index <= row.GetNumChildren(); index += 1) {
    const child = row.GetChild(index) as Control | undefined
    if (child === undefined || child.GetType() !== CT_LABEL) continue
    const label = child as ColoredLabel
    const [r, g, b, a] = label.GetColor()
    labels.push({ text: label.GetText(), r, g, b, a })
  }
  return labels
}

function rowDrawn(this: void, row: Control): TemperCharactersTaskHudRowDrawn {
  const [, , , , , offsetY] = row.GetAnchor(0)
  return {
    name: row.GetName(),
    hidden: row.IsHidden(),
    controlHidden: row.IsControlHidden(),
    offsetY,
    labels: labelsOf(row),
  }
}

function windowDrawn(this: void, window: Control): TemperCharactersTaskHudWindowDrawn {
  return {
    name: window.GetName(),
    hidden: window.IsHidden(),
    controlHidden: window.IsControlHidden(),
    alpha: window.GetAlpha(),
    left: window.GetLeft(),
    top: window.GetTop(),
    width: window.GetWidth(),
    height: window.GetHeight(),
  }
}

function namedWindow(this: void, name: string): TemperCharactersTaskHudNamedWindow {
  const control = WINDOW_MANAGER.GetControlByName(name)
  if (control === undefined) return { name, exists: false }
  return {
    name,
    exists: true,
    hidden: control.IsHidden(),
    controlHidden: control.IsControlHidden(),
  }
}

function drawn(this: void): TemperCharactersTaskHudDrawn | undefined {
  try {
    const window = getHudWindow()
    const content = getContentContainer()
    const empty = getEmptyLabel()
    const fragment = getHudFragment()
    return {
      exit: lastRefreshExit(),
      window: window === undefined ? undefined : windowDrawn(window),
      contentHidden: content?.IsHidden(),
      contentChildren: content?.GetNumChildren(),
      emptyHidden: empty?.IsHidden(),
      fragmentShowing: fragment?.IsShowing(),
      named: [namedWindow(HUD_NAME), namedWindow(`${HUD_NAME}_v2`)],
      rows: getRowPool().map((row) => rowDrawn(row)),
    }
  } catch {
    return undefined
  }
}

function readTaskHudView(this: void): TemperCharactersTaskHudViewReading | undefined {
  try {
    const refreshes = refreshesNoted()
    return {
      assistedName: getActiveQuests().find((quest) => quest.isAssisted)?.name,
      refreshCount: refreshes.count,
      lastRefreshAt: refreshes.lastAt,
      lastSyncedName: lastSyncedAssistedName(),
      quests: questFocuses(),
      drawn: drawn(),
    }
  } catch {
    return undefined
  }
}

globalThis.TemperCharactersTaskHudView = { Read: readTaskHudView }
