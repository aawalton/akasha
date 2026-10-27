import {
  type ActiveQuest,
  getActiveQuests,
} from "akasha/temper/addon/pages/characters/modules/characters-active-quests/characters-active-quests.module.code.ts"
import { getCharactersConfig } from "akasha/temper/addon/pages/characters/modules/characters-config/characters-config.module.code.ts"
import { ENRICHMENT_SELECTORS } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-enrichment-registry/characters-task-hud-enrichment-registry.module.code.ts"
import {
  type FitNode,
  fitNodes,
  isWhole,
  type ListFit,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-fit/characters-task-hud-fit.module.code.ts"
import { isFullyCompleteAtLoad } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-full-completion/characters-task-hud-full-completion.module.code.ts"
import {
  appendQuestHintRow,
  createQuestRow,
  createSubRow,
  createTaskRow,
  type SubRowSpec,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-rows/characters-task-hud-rows.module.code.ts"
import {
  DRAG_HEIGHT,
  getContentContainer,
  getDragHandle,
  getEmptyLabel,
  getHudFragment,
  getHudWindow,
  getLabelPool,
  getRowPool,
  HUD_NAME,
  INDICATOR_WIDTH,
  initiallyCompletedTaskIds,
  isContainerCard,
  MIN_HUD_WIDTH,
  noteRefresh,
  noteRefreshExit,
  PLEDGE_SUB_ROW_HEIGHT,
  priorityRank,
  pushRow,
  QUEST_HINT_WIDTH,
  ROW_HEIGHT,
  ROW_PADDING,
  resetPools,
  setHudControls,
  syncAssistedQuest,
  toggleQuestExpanded,
  toggleTaskExpanded,
  userExpandedTaskIds,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-state/characters-task-hud-state.module.code.ts"
import {
  getDungeonSetsForCurrentZone,
  isQuestExpanded,
  isTaskComplete,
  isTaskExpanded,
  isTaskVisible,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-visibility/characters-task-hud-visibility.module.code.ts"
import { resolveTaskProgress } from "akasha/temper/addon/pages/characters/modules/characters-task-progress-resolver/characters-task-progress-resolver.module.code.ts"
import { createMovableWindow } from "akasha/temper/modules/movable-window/movable-window.module.code.ts"
import { isResettingCard } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-reset-behavior/completion-card-reset-behavior.module.code.ts"
import {
  getSavedVariables,
  type TaskData,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import {
  colorOf,
  colorText,
  styleTextOverPlay,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-global/temper-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function initializeTaskHud(): undefined {
  if (getHudWindow()) return

  const existing = WINDOW_MANAGER.GetControlByName(HUD_NAME)
  if (existing) {
    existing.SetHidden(true)
  }

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(HUD_NAME + "_v2")
  tlw.SetDimensions(MIN_HUD_WIDTH, ROW_HEIGHT)
  tlw.SetResizeToFitDescendents(true)
  tlw.SetHidden(false)

  const contentContainer = WINDOW_MANAGER.CreateControl("$(parent)Content", tlw, CT_CONTROL)
  contentContainer.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, DRAG_HEIGHT)
  contentContainer.SetWidth(MIN_HUD_WIDTH)
  contentContainer.SetResizeToFitDescendents(true)

  const emptyLabel = WINDOW_MANAGER.CreateControl("$(parent)Empty", tlw, CT_LABEL)
  emptyLabel.SetAnchor(TOPLEFT, tlw, TOPLEFT, 8, DRAG_HEIGHT)
  colorText(styleTextOverPlay(emptyLabel, "strong"), colorOf("body"))
  emptyLabel.SetText("No task is left today.")
  emptyLabel.SetHidden(true)

  const dragHandle = WINDOW_MANAGER.CreateControl("$(parent)DragHandle", tlw, CT_CONTROL)
  dragHandle.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, 0)
  dragHandle.SetDimensions(MIN_HUD_WIDTH, DRAG_HEIGHT)

  const hudFragment = ZO_HUDFadeSceneFragment.New(tlw)
  HUD_SCENE.AddFragment(hudFragment)
  HUD_UI_SCENE.AddFragment(hudFragment)

  createMovableWindow({
    window: tlw,
    dragHandle,
    loadPosition: () => {
      const pos = getSavedVariables().taskPanelPosition
      if (pos === undefined) return undefined
      return { left: pos.x, top: pos.y }
    },
    savePosition: (position) => {
      getSavedVariables().taskPanelPosition = { x: position.left, y: position.top }
    },
    applyDefaultAnchor: () => {
      tlw.SetAnchor(TOPRIGHT, GuiRoot, TOPRIGHT, -20, 200)
    },
  })

  setHudControls({ hudWindow: tlw, hudFragment, contentContainer, dragHandle, emptyLabel })

  for (const [taskId, task] of Object.entries(getCharactersConfig().tasks)) {
    if (!isTaskVisible(task)) continue
    if (!isResettingCard(task.completionCardId)) continue
    const completed = isFullyCompleteAtLoad({
      hasTimestampToday: isTaskComplete(taskId, task),
      progress: resolveTaskProgress(task),
    })
    if (completed) {
      initiallyCompletedTaskIds.add(taskId)
    }
  }

  CALLBACK_MANAGER.RegisterCallback(
    "Temper_InventoryActionsChanged",
    function (this: void): undefined {
      refreshTaskHud()
    }
  )

  for (const questEvent of [
    EVENT_QUEST_ADDED,
    EVENT_QUEST_REMOVED,
    EVENT_QUEST_ADVANCED,
    EVENT_QUEST_LIST_UPDATED,
    EVENT_QUEST_CONDITION_COUNTER_CHANGED,
    EVENT_TRACKING_UPDATE,
  ]) {
    EVENT_MANAGER.RegisterForEvent(
      `${HUD_NAME}_Quest_${questEvent}`,
      questEvent,
      function (this: void): undefined {
        refreshTaskHud()
      }
    )
  }

  CALLBACK_MANAGER.RegisterCallback(
    "QuestTrackerUpdatedOnScreen",
    function (this: void): undefined {
      refreshTaskHud()
    }
  )

  FOCUSED_QUEST_TRACKER.RegisterCallback(
    "QuestTrackerAssistStateChanged",
    function (this: void): undefined {
      refreshTaskHud()
    }
  )

  refreshTaskHud()
}

export function refreshTaskHud(): undefined {
  noteRefresh(GetGameTimeMilliseconds())
  const contentContainer = getContentContainer()
  const hudWindow = getHudWindow()
  const hudFragment = getHudFragment()
  if (!contentContainer || !hudWindow || !hudFragment) {
    noteRefreshExit("early")
    return
  }

  resetPools()

  const visibleTasks: Array<[string, TaskData]> = []
  for (const [id, task] of Object.entries(getCharactersConfig().tasks)) {
    if (initiallyCompletedTaskIds.has(id)) continue
    if (isTaskVisible(task)) {
      visibleTasks.push([id, task])
    }
  }

  visibleTasks.sort(([, a], [, b]) => {
    const contA = isContainerCard(a.completionCardId) ? 1 : 0
    const contB = isContainerCard(b.completionCardId) ? 1 : 0
    if (contA !== contB) return contA - contB
    const rankA = priorityRank(a.priority)
    const rankB = priorityRank(b.priority)
    if (rankA !== rankB) return rankA - rankB
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })

  const dungeonSets = getDungeonSetsForCurrentZone()

  const activeQuests = getActiveQuests()
  syncAssistedQuest(activeQuests.find((q) => q.isAssisted)?.name)

  const containerCountFor = (task: TaskData): number | undefined => {
    const card = task.completionCardId
    if (card === "active-quests") {
      return activeQuests.length > 0 ? activeQuests.length : undefined
    }

    if (card === "dungeon-sets") {
      return dungeonSets !== undefined ? dungeonSets.incompleteSets.length : undefined
    }
    return undefined
  }

  const entries: TaskEntry[] = []
  for (const [taskId, task] of visibleTasks) {
    const containerCount = containerCountFor(task)
    if (isContainerCard(task.completionCardId) && containerCount === undefined) continue
    entries.push({ taskId, task, containerCount })
  }

  const emptyLabel = getEmptyLabel()
  if (entries.length === 0) {
    if (emptyLabel) emptyLabel.SetHidden(false)
    contentContainer.SetHidden(true)
    noteRefreshExit("empty")
    return
  }
  if (emptyLabel) emptyLabel.SetHidden(true)
  contentContainer.SetHidden(false)

  const seen: HintSeen = { questHint: false }
  const rows = entries.map((entry) => taskRow(entry, activeQuests, seen))
  const measured = measureRows(rows, 0)
  const room = roomOf(hudWindow, measured.yOffset)
  const fit = fitNodes(measured.nodes, room, PLEDGE_SUB_ROW_HEIGHT + ROW_PADDING)
  if (!isWhole(fit, rows.length)) {
    resetPools()
    seen.questHint = false
    drawFitted(rows, fit, 0, 0)
  }

  const extraMinWidth = seen.questHint ? INDICATOR_WIDTH + 4 + QUEST_HINT_WIDTH + 8 : 0
  applyAutoWidth(contentContainer, hudWindow, extraMinWidth)
  noteRefreshExit("completed")
}

interface TaskEntry {
  readonly taskId: string
  readonly task: TaskData
  readonly containerCount: number | undefined
}

interface HintSeen {
  questHint: boolean
}

interface HudRow {
  readonly draw: (this: void, yOffset: number, opened: boolean) => number
  readonly children: readonly HudRow[]
  readonly foldable: boolean
}

function roomOf(hudWindow: TopLevelWindow, wanted: number): number {
  const given = Temper?.fitHudPanel(
    hudWindow.GetName(),
    wanted + DRAG_HEIGHT,
    function (this: void): undefined {
      refreshTaskHud()
    }
  )
  if (given === undefined) return GuiRoot.GetHeight() - hudWindow.GetTop() - DRAG_HEIGHT
  hudWindow.SetMovable(false)
  return given - DRAG_HEIGHT
}

function measureRows(
  rows: readonly HudRow[],
  yOffset: number
): { readonly nodes: FitNode[]; readonly yOffset: number } {
  const nodes: FitNode[] = []
  let y = yOffset
  for (const row of rows) {
    const top = y
    y = row.draw(y, true)
    const height = y - top
    const inner = measureRows(row.children, y)
    y = inner.yOffset
    nodes.push({ height, children: inner.nodes, foldable: row.foldable })
  }
  return { nodes, yOffset: y }
}

function drawFitted(rows: readonly HudRow[], fit: ListFit, yOffset: number, depth: number): number {
  let y = yOffset
  for (let index = 0; index < fit.shown; index++) {
    const row = rows[index]
    const one = fit.nodes[index]
    if (row === undefined || one === undefined) continue
    y = row.draw(y, one.kind !== "folded")
    if (one.kind === "whole") y = measureRows(row.children, y).yOffset
    if (one.kind === "cut") y = drawFitted(row.children, one.children, y, depth + 1)
  }
  const left = rows.length - fit.shown
  return left > 0 ? appendMoreRow(left, y, depth) : y
}

function appendMoreRow(left: number, yOffset: number, depth: number): number {
  const noun = depth === 0 ? (left === 1 ? " task" : " tasks") : ""
  pushRow(
    createSubRow({ text: `+${left} more${noun}`, color: "default", indent: depth }, yOffset, false)
  )
  return yOffset + PLEDGE_SUB_ROW_HEIGHT + ROW_PADDING
}

function taskRow(entry: TaskEntry, activeQuests: readonly ActiveQuest[], seen: HintSeen): HudRow {
  const { taskId, task, containerCount } = entry
  let completed = false
  if (!isContainerCard(task.completionCardId)) {
    const progress = resolveTaskProgress(task)
    completed =
      isTaskComplete(taskId, task) || (progress !== undefined && progress.current >= progress.total)
  }
  const expanded = isTaskExpanded(taskId, completed)
  const children = !expanded
    ? []
    : task.completionCardId === "active-quests"
      ? activeQuests.map((quest) => questRow(quest, seen))
      : subRowsOf(task, completed)

  return {
    children,
    foldable: !userExpandedTaskIds.has(taskId),
    draw: (yOffset, opened) => {
      const row = createTaskRow(taskId, task, yOffset, containerCount)
      pushRow(row)
      row.SetMouseEnabled(true)
      row.SetHandler("OnMouseUp", function (this: void): undefined {
        toggleTaskExpanded(taskId, expanded && opened)
        refreshTaskHud()
      })
      return yOffset + ROW_HEIGHT + ROW_PADDING
    },
  }
}

function questRow(quest: ActiveQuest, seen: HintSeen): HudRow {
  const questExpanded = isQuestExpanded(quest.name, quest.isAssisted)
  const hint = quest.hint
  const children: HudRow[] = []
  if (questExpanded && hint !== undefined) {
    children.push({
      children: [],
      foldable: false,
      draw: (yOffset) => {
        seen.questHint = true
        return appendQuestHintRow(hint, yOffset)
      },
    })
  }

  return {
    children,
    foldable: true,
    draw: (yOffset, opened) => {
      const row = createQuestRow(quest, yOffset)
      row.SetMouseEnabled(true)
      row.SetHandler("OnMouseUp", function (this: void): undefined {
        toggleQuestExpanded(quest.name, questExpanded && opened)
        refreshTaskHud()
      })
      return yOffset + ROW_HEIGHT + ROW_PADDING
    },
  }
}

function subRowsOf(task: TaskData, completed: boolean): HudRow[] {
  const rows: HudRow[] = []
  let group: HudRow[] | undefined
  for (const selector of ENRICHMENT_SELECTORS) {
    if (!selector.matches(task)) continue
    for (const spec of selector.select(task)) {
      if ((spec.indent ?? 1) >= 2 && group !== undefined) {
        group.push(subRow(spec, completed, []))
        continue
      }
      group = []
      rows.push(subRow(spec, completed, group))
    }
  }
  return rows
}

function subRow(spec: SubRowSpec, completed: boolean, children: readonly HudRow[]): HudRow {
  return {
    children,
    foldable: true,
    draw: (yOffset) => {
      const row = createSubRow(spec, yOffset, completed)
      const onClick = spec.onClick
      if (onClick !== undefined) {
        row.SetMouseEnabled(true)
        row.SetHandler("OnMouseUp", function (this: void): undefined {
          onClick()
          refreshTaskHud()
        })
      }
      pushRow(row)
      return yOffset + PLEDGE_SUB_ROW_HEIGHT + ROW_PADDING
    },
  }
}

function applyAutoWidth(
  contentContainer: Control,
  hudWindow: TopLevelWindow,
  extraMinWidth: number
): undefined {
  let maxLabelWidth = 0
  for (const { label, trailingWidth } of getLabelPool()) {
    const w = label.GetTextWidth() + trailingWidth
    if (w > maxLabelWidth) maxLabelWidth = w
  }
  const computedWidth = math.max(MIN_HUD_WIDTH, INDICATOR_WIDTH + maxLabelWidth + 12, extraMinWidth)
  contentContainer.SetWidth(computedWidth)
  const dragHandle = getDragHandle()
  if (dragHandle) dragHandle.SetWidth(computedWidth)
  hudWindow.SetWidth(computedWidth)
  for (const row of getRowPool()) {
    row.SetWidth(computedWidth)
  }
}
