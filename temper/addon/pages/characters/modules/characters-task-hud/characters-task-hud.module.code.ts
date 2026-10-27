import {
  type ActiveQuest,
  getActiveQuests,
} from "akasha/temper/addon/pages/characters/modules/characters-active-quests/characters-active-quests.module.code.ts"
import { getCharactersConfig } from "akasha/temper/addon/pages/characters/modules/characters-config/characters-config.module.code.ts"
import { ENRICHMENT_SELECTORS } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-enrichment-registry/characters-task-hud-enrichment-registry.module.code.ts"
import {
  fitTaskBlocks,
  type TaskBlock,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-fit/characters-task-hud-fit.module.code.ts"
import { isFullyCompleteAtLoad } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-full-completion/characters-task-hud-full-completion.module.code.ts"
import {
  appendQuestHintRow,
  createQuestRow,
  createSubRow,
  createTaskRow,
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

  let drawn = drawTasks(entries, activeQuests, [], entries.length)
  const fit = fitTaskBlocks(drawn.blocks, roomBelow(hudWindow), PLEDGE_SUB_ROW_HEIGHT + ROW_PADDING)
  if (fit.shown < entries.length || fit.folded.some((one) => one)) {
    resetPools()
    drawn = drawTasks(entries, activeQuests, fit.folded, fit.shown)
    if (fit.shown < entries.length) appendMoreRow(entries.length - fit.shown, drawn.yOffset)
  }

  const extraMinWidth = drawn.questHintShown ? INDICATOR_WIDTH + 4 + QUEST_HINT_WIDTH + 8 : 0
  applyAutoWidth(contentContainer, hudWindow, extraMinWidth)
  noteRefreshExit("completed")
}

interface TaskEntry {
  readonly taskId: string
  readonly task: TaskData
  readonly containerCount: number | undefined
}

interface DrawnTasks {
  readonly blocks: readonly TaskBlock[]
  readonly yOffset: number
  readonly questHintShown: boolean
}

function roomBelow(hudWindow: TopLevelWindow): number {
  return GuiRoot.GetHeight() - hudWindow.GetTop() - DRAG_HEIGHT
}

function appendMoreRow(left: number, yOffset: number): undefined {
  const text = left === 1 ? "+1 more task" : `+${left} more tasks`
  pushRow(createSubRow({ text, color: "default", indent: 0 }, yOffset, false))
}

function drawTasks(
  entries: readonly TaskEntry[],
  activeQuests: readonly ActiveQuest[],
  folded: readonly boolean[],
  shown: number
): DrawnTasks {
  const blocks: TaskBlock[] = []
  let yOffset = 0
  let questHintShown = false
  for (let index = 0; index < shown; index++) {
    const entry = entries[index]
    if (entry === undefined) continue
    const { taskId, task, containerCount } = entry
    const isContainer = isContainerCard(task.completionCardId)
    const top = yOffset

    const row = createTaskRow(taskId, task, yOffset, containerCount)
    pushRow(row)
    yOffset += ROW_HEIGHT + ROW_PADDING

    let completed = false
    if (!isContainer) {
      const progress = resolveTaskProgress(task)
      completed =
        isTaskComplete(taskId, task) ||
        (progress !== undefined && progress.current >= progress.total)
    }
    const expanded = isTaskExpanded(taskId, completed) && folded[index] !== true

    row.SetMouseEnabled(true)
    row.SetHandler("OnMouseUp", function (this: void): undefined {
      toggleTaskExpanded(taskId, expanded)
      refreshTaskHud()
    })

    if (expanded && task.completionCardId === "active-quests") {
      for (const quest of activeQuests) {
        const questExpanded = isQuestExpanded(quest.name, quest.isAssisted)
        const questRow = createQuestRow(quest, yOffset)
        yOffset += ROW_HEIGHT + ROW_PADDING

        questRow.SetMouseEnabled(true)
        questRow.SetHandler("OnMouseUp", function (this: void): undefined {
          toggleQuestExpanded(quest.name, questExpanded)
          refreshTaskHud()
        })

        if (questExpanded && quest.hint !== undefined) {
          yOffset = appendQuestHintRow(quest.hint, yOffset)
          questHintShown = true
        }
      }
    } else if (expanded) {
      yOffset = appendTaskSubRows(task, completed, yOffset)
    }

    blocks.push({
      height: yOffset - top,
      foldedHeight: ROW_HEIGHT + ROW_PADDING,
      foldable: expanded && !userExpandedTaskIds.has(taskId),
    })
  }
  return { blocks, yOffset, questHintShown }
}

function appendTaskSubRows(task: TaskData, completed: boolean, yOffset: number): number {
  for (const selector of ENRICHMENT_SELECTORS) {
    if (!selector.matches(task)) continue
    for (const spec of selector.select(task)) {
      const subRow = createSubRow(spec, yOffset, completed)
      const onClick = spec.onClick
      if (onClick !== undefined) {
        subRow.SetMouseEnabled(true)
        subRow.SetHandler("OnMouseUp", function (this: void): undefined {
          onClick()
          refreshTaskHud()
        })
      }
      pushRow(subRow)
      yOffset += PLEDGE_SUB_ROW_HEIGHT + ROW_PADDING
    }
  }
  return yOffset
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
