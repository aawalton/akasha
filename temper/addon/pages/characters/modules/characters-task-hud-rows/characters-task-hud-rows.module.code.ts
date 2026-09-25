import {
  GREEN,
  PURPLE,
  YELLOW,
} from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import { TEXT_SECONDARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import type { ActiveQuest } from "akasha/temper/addon/pages/characters/modules/characters-active-quests/characters-active-quests.module.code.ts"
import {
  countSuffix,
  progressSuffix,
} from "akasha/temper/addon/pages/characters/modules/characters-progress-format/characters-progress-format.module.code.ts"
import {
  getAntiquityLeadSessionProgress,
  isAntiquitySessionTask,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-enrichment/characters-task-hud-enrichment.module.code.ts"
import {
  getContentContainer,
  INDICATOR_WIDTH,
  MIN_HUD_WIDTH,
  PLEDGE_SUB_ROW_HEIGHT,
  priorityColor,
  pushLabel,
  pushRow,
  QUEST_HINT_WIDTH,
  ROW_HEIGHT,
  ROW_PADDING,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-state/characters-task-hud-state.module.code.ts"
import { isTaskComplete } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-visibility/characters-task-hud-visibility.module.code.ts"
import { resolveTaskProgress } from "akasha/temper/addon/pages/characters/modules/characters-task-progress-resolver/characters-task-progress-resolver.module.code.ts"
import type { TaskData } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import {
  colorText,
  styleTextOverPlay,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { ROW_PADDING_X } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const COUNT_GAP = 16

function requireContentContainer(): Control {
  const cc = getContentContainer()
  if (cc === undefined) {
    throw new Error("characters-task-hud-rows: contentContainer not initialized")
  }
  return cc
}

export function createTaskRow(
  taskId: string,
  task: TaskData,
  yOffset: number,
  containerCount?: number
): Control {
  const contentContainer = requireContentContainer()
  const row = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  row.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)
  row.SetDimensions(MIN_HUD_WIDTH, ROW_HEIGHT)

  if (containerCount !== undefined) {
    const titleLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    titleLabel.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)
    colorText(styleTextOverPlay(titleLabel, "heading"), TEXT_SECONDARY)
    titleLabel.SetText(task.title)

    const countLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    countLabel.SetAnchor(RIGHT, row, RIGHT, -ROW_PADDING_X, 0)
    countLabel.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
    colorText(styleTextOverPlay(countLabel, "number"), TEXT_SECONDARY)
    countLabel.SetText(countSuffix(containerCount))
    pushLabel(titleLabel, COUNT_GAP + countLabel.GetTextWidth() + ROW_PADDING_X)

    return row
  }

  const sessionCard = isAntiquitySessionTask(task)
  const progress = sessionCard
    ? getAntiquityLeadSessionProgress(task.completionCardId)
    : resolveTaskProgress(task)
  const completed = sessionCard
    ? progress !== undefined && progress.current > 0
    : isTaskComplete(taskId, task) || (progress !== undefined && progress.current >= progress.total)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)

  const titleColor = completed ? GREEN : priorityColor(task.priority)
  colorText(styleTextOverPlay(label, "heading"), titleColor)
  label.SetText(task.title)

  let trailingWidth = 0
  if (progress !== undefined) {
    const progressLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    progressLabel.SetAnchor(RIGHT, row, RIGHT, -ROW_PADDING_X, 0)
    progressLabel.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
    colorText(styleTextOverPlay(progressLabel, "number"), titleColor)
    progressLabel.SetText(progressSuffix(progress.current, progress.total))
    trailingWidth = COUNT_GAP + progressLabel.GetTextWidth() + ROW_PADDING_X
  }
  pushLabel(label, trailingWidth)

  return row
}

export type SubRowColor = "default" | "green" | "purple" | "yellow"

export interface SubRowSpec {
  readonly text: string
  readonly color: SubRowColor
  readonly indent?: number
}

const PRE_COMPLETION_RGB: Record<SubRowColor, readonly [number, number, number]> = {
  default: TEXT_SECONDARY,
  green: GREEN,
  purple: PURPLE,
  yellow: YELLOW,
}

const INDENT_UNIT = "    "

function indentText(level: number): string {
  return INDENT_UNIT.repeat(level)
}

export function createSubRow(spec: SubRowSpec, yOffset: number, completed: boolean): Control {
  const contentContainer = requireContentContainer()
  const row = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  row.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)
  row.SetDimensions(MIN_HUD_WIDTH, PLEDGE_SUB_ROW_HEIGHT)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)
  const rgb = completed ? GREEN : PRE_COMPLETION_RGB[spec.color]
  colorText(styleTextOverPlay(label, "body"), rgb)
  label.SetText(indentText(spec.indent ?? 1) + spec.text)
  pushLabel(label)

  return row
}

export function createQuestRow(quest: ActiveQuest, yOffset: number): Control {
  const contentContainer = requireContentContainer()
  const questRow = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  questRow.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)
  questRow.SetDimensions(MIN_HUD_WIDTH, ROW_HEIGHT)

  const questLabel = WINDOW_MANAGER.CreateControl(undefined, questRow, CT_LABEL)
  questLabel.SetAnchor(LEFT, questRow, LEFT, INDICATOR_WIDTH + 4, 0)
  styleTextOverPlay(questLabel, quest.isAssisted ? "accent" : "muted")
  questLabel.SetText(indentText(1) + quest.name.trim())
  pushLabel(questLabel)

  pushRow(questRow)
  return questRow
}

export function appendQuestHintRow(hint: string, yOffset: number): number {
  const contentContainer = requireContentContainer()
  const row = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  row.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(TOPLEFT, row, TOPLEFT, INDICATOR_WIDTH + 4, 0)
  colorText(styleTextOverPlay(label, "body"), YELLOW)
  label.SetWidth(QUEST_HINT_WIDTH)
  label.SetText(indentText(2) + hint.trim())
  const textHeight = label.GetTextHeight()
  label.SetHeight(textHeight)
  row.SetDimensions(MIN_HUD_WIDTH, textHeight)

  pushRow(row)
  return yOffset + textHeight + ROW_PADDING
}
