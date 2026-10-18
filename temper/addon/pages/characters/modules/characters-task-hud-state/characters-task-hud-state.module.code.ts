import {
  colorOf,
  textColorOf,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { STAT_ROW_HEIGHT } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type HudRgb = readonly [number, number, number]

export type HudColor = "plain" | "done" | "urgent" | "gold" | "blue" | "purple"

function qualityColor(quality: number): HudRgb {
  const [red, green, blue] = GetItemQualityColor(quality).UnpackRGB()
  return [red, green, blue]
}

export function hudColor(kind: HudColor): HudRgb {
  if (kind === "done") return textColorOf(INTERFACE_TEXT_COLOR_SUCCEEDED)
  if (kind === "urgent") return textColorOf(INTERFACE_TEXT_COLOR_FAILED)
  if (kind === "gold") return colorOf("accent")
  if (kind === "blue") return qualityColor(ITEM_DISPLAY_QUALITY_MAGIC)
  if (kind === "purple") return qualityColor(ITEM_DISPLAY_QUALITY_ARCANE)
  return colorOf("body")
}

export const HUD_NAME = "TemperTaskHUD"
export const MIN_HUD_WIDTH = 120
export const ROW_HEIGHT = STAT_ROW_HEIGHT
export const ROW_PADDING = 0
export const DRAG_HEIGHT = 8
export const PLEDGE_SUB_ROW_HEIGHT = STAT_ROW_HEIGHT
export const UNDAUNTED_SKILL_LINE_ID = 55
export const INDICATOR_WIDTH = 36
export const QUEST_HINT_WIDTH = 320

export function priorityColor(priority: string | undefined): HudRgb {
  if (priority === "p1") return hudColor("urgent")
  if (priority === "p2") return hudColor("gold")
  if (priority === "p3") return hudColor("blue")
  return hudColor("plain")
}

export function priorityRank(priority: string | undefined): number {
  if (priority === "p1") return 1
  if (priority === "p2") return 2
  if (priority === "p3") return 3
  if (priority === "p4") return 4
  return 5
}

export function isContainerCard(cardId: string | undefined): boolean {
  return cardId === "active-quests" || cardId === "dungeon-sets"
}

let hudWindow: TopLevelWindow | undefined
let hudFragment: HUDFadeSceneFragment | undefined
let contentContainer: Control | undefined
let dragHandle: Control | undefined
let emptyLabel: LabelControl | undefined
let rowPool: Control[] = []
let labelPool: { label: LabelControl; trailingWidth: number }[] = []
export const initiallyCompletedTaskIds = new LuaSet<string>()
export const userExpandedTaskIds = new LuaSet<string>()
export const userCollapsedTaskIds = new LuaSet<string>()
export const userExpandedQuestIds = new LuaSet<string>()
export const userCollapsedQuestIds = new LuaSet<string>()

export function getHudWindow(): TopLevelWindow | undefined {
  return hudWindow
}

export function getHudFragment(): HUDFadeSceneFragment | undefined {
  return hudFragment
}

export function getContentContainer(): Control | undefined {
  return contentContainer
}

export function getDragHandle(): Control | undefined {
  return dragHandle
}

export function getEmptyLabel(): LabelControl | undefined {
  return emptyLabel
}

export function getRowPool(): Control[] {
  return rowPool
}

export function getLabelPool(): { label: LabelControl; trailingWidth: number }[] {
  return labelPool
}

export function setHudControls(controls: {
  hudWindow: TopLevelWindow
  hudFragment: HUDFadeSceneFragment
  contentContainer: Control
  dragHandle: Control
  emptyLabel: LabelControl
}): undefined {
  hudWindow = controls.hudWindow
  hudFragment = controls.hudFragment
  contentContainer = controls.contentContainer
  dragHandle = controls.dragHandle
  emptyLabel = controls.emptyLabel
}

export function resetPools(): undefined {
  for (const row of rowPool) {
    row.SetHidden(true)
  }
  rowPool = []
  labelPool = []
}

export function pushRow(row: Control): undefined {
  rowPool.push(row)
}

export function pushLabel(label: LabelControl, trailingWidth = 0): undefined {
  labelPool.push({ label, trailingWidth })
}

export function clearInitialCompletion(taskId: string): undefined {
  initiallyCompletedTaskIds.delete(taskId)
}

export function toggleTaskExpanded(taskId: string, currentlyExpanded: boolean): undefined {
  if (currentlyExpanded) {
    userExpandedTaskIds.delete(taskId)
    userCollapsedTaskIds.add(taskId)
  } else {
    userCollapsedTaskIds.delete(taskId)
    userExpandedTaskIds.add(taskId)
  }
}

export function toggleQuestExpanded(questKey: string, currentlyExpanded: boolean): undefined {
  if (currentlyExpanded) {
    userExpandedQuestIds.delete(questKey)
    userCollapsedQuestIds.add(questKey)
  } else {
    userCollapsedQuestIds.delete(questKey)
    userExpandedQuestIds.add(questKey)
  }
}

let lastAssistedQuestName: string | undefined

let refreshCount = 0

let lastRefreshAt: number | undefined

export function noteRefresh(at: number): undefined {
  refreshCount += 1
  lastRefreshAt = at
}

export function refreshesNoted(): { readonly count: number; readonly lastAt: number | undefined } {
  return { count: refreshCount, lastAt: lastRefreshAt }
}

type RefreshExit = "early" | "empty" | "completed"

let lastExit: RefreshExit | undefined

export function noteRefreshExit(exit: RefreshExit): undefined {
  lastExit = exit
}

export function lastRefreshExit(): RefreshExit | undefined {
  return lastExit
}

export function lastSyncedAssistedName(): string | undefined {
  return lastAssistedQuestName
}

export function syncAssistedQuest(currentAssistedName: string | undefined): undefined {
  if (currentAssistedName === lastAssistedQuestName) return
  lastAssistedQuestName = currentAssistedName
  for (const key of Object.keys(userExpandedQuestIds)) userExpandedQuestIds.delete(key)
  for (const key of Object.keys(userCollapsedQuestIds)) userCollapsedQuestIds.delete(key)
}
