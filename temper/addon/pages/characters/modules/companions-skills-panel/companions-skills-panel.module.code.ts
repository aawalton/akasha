import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import { requireAt } from "akasha/code/type/narrowing/modules/require-at/require-at.module.code.ts"

import {
  type CompanionBuildData,
  SKILL_SLOT_INDICES,
} from "akasha/temper/addon/pages/characters/modules/companions-codec/companions-codec.module.code.ts"
import { decodeCompanionBuild } from "akasha/temper/addon/pages/characters/modules/companions-decoder/companions-decoder.module.code.ts"
import { getAbilityIdFromSkillIndex } from "akasha/temper/addon/pages/characters/modules/companions-reverse-mappings/companions-reverse-mappings.module.code.ts"
import type { SavedCompanionBuild } from "akasha/temper/addon/pages/characters/modules/companions-saved-variables/companions-saved-variables.module.code.ts"
import {
  createCompanionDropdown,
  DROPDOWN_BOTTOM_MARGIN,
  DROPDOWN_HEIGHT,
  getCleanCompanionName,
  getSavedCompanionBuild,
  getSelectedCompanionId,
  isSelectedCompanionActive,
} from "akasha/temper/addon/pages/characters/modules/companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "akasha/temper/addon/pages/characters/modules/companions-target-build-input/companions-target-build-input.module.code.ts"
import {
  colorOf,
  styleText,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  buildDataState,
  type DataStateView,
} from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import {
  drawPanel,
  ROW_PADDING_X,
  STAT_ROW_HEIGHT,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"

const WINDOW_LEVEL = 1
const CHOOSE_COMPANION = "Choose a companion above."
const MINI_ICON_SIZE = 24
const MINI_CARD_HEIGHT = STAT_ROW_HEIGHT
const MINI_CARD_PADDING = (MINI_CARD_HEIGHT - MINI_ICON_SIZE) / 2
const MINI_TEXT_LEFT = MINI_ICON_SIZE + MINI_CARD_PADDING * 2
const SKILL_ROW_HEIGHT = MINI_CARD_HEIGHT
const SKILL_SECTION_COL_LEFT = ROW_PADDING_X
const SKILL_SECTION_COL_WIDTH = 80
const SKILL_SLOT_COL_LEFT = SKILL_SECTION_COL_LEFT + SKILL_SECTION_COL_WIDTH
const SKILL_SLOT_COL_WIDTH = 90
const SKILL_VALUE_COL_LEFT = SKILL_SLOT_COL_LEFT + SKILL_SLOT_COL_WIDTH
const SKILL_VALUE_COL_WIDTH = 220
const SKILL_OPTIMAL_COL_LEFT = SKILL_VALUE_COL_LEFT + SKILL_VALUE_COL_WIDTH + spaceOf("2")

interface SkillMiniCard {
  container: Control
  icon: TextureControl
  nameLabel: LabelControl
}

interface SkillRow {
  sectionLabel: LabelControl | undefined
  slotLabel: LabelControl
  currentCard: SkillMiniCard
  optimalCard: SkillMiniCard
}

interface SkillsPanelState {
  panel: Control
  emptyState: DataStateView
  dataContainer: Control
  rows: SkillRow[]
}

let skillsState: SkillsPanelState | undefined

function createSkillMiniCard(parent: Control, offsetX: number, offsetY: number): SkillMiniCard {
  const container = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, offsetX, offsetY)
  container.SetDimensions(SKILL_VALUE_COL_WIDTH, MINI_CARD_HEIGHT)

  const icon = WINDOW_MANAGER.CreateControl(undefined, container, CT_TEXTURE)
  icon.SetDimensions(MINI_ICON_SIZE, MINI_ICON_SIZE)
  icon.SetAnchor(TOPLEFT, container, TOPLEFT, 0, MINI_CARD_PADDING)

  const nameLabel = WINDOW_MANAGER.CreateControl(undefined, container, CT_LABEL)
  nameLabel.SetAnchor(TOPLEFT, container, TOPLEFT, MINI_TEXT_LEFT, MINI_CARD_PADDING)
  nameLabel.SetDimensions(SKILL_VALUE_COL_WIDTH - MINI_TEXT_LEFT, MINI_ICON_SIZE)
  styleText(nameLabel, "body")
  nameLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  nameLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

  return { container, icon, nameLabel }
}

function renderMiniCard(card: SkillMiniCard, abilityId: number): undefined {
  if (abilityId !== 0) {
    const [red, green, blue] = colorOf("body")
    card.icon.SetTexture(GetAbilityIcon(abilityId))
    card.icon.SetColor(red, green, blue, 1)
    card.nameLabel.SetText(GetAbilityName(abilityId))
    styleText(card.nameLabel, "body")
  } else {
    const [red, green, blue] = colorOf("hint")
    card.icon.SetTexture("")
    card.icon.SetColor(red, green, blue, 1)
    card.nameLabel.SetText("Empty")
    styleText(card.nameLabel, "hint")
  }
}

const SKILL_SLOT_LABELS = ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5", "Ultimate"]
const SKILL_SECTION_LABELS = ["Active", "", "", "", "", "Ultimate"]

export function createCompanionSkillsPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  createCompanionDropdown(panel)
  const contentTop = DROPDOWN_HEIGHT + DROPDOWN_BOTTOM_MARGIN

  const emptyArea = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  emptyArea.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop)
  emptyArea.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  const emptyState = buildDataState(emptyArea, { empty: CHOOSE_COMPANION, level: WINDOW_LEVEL })

  const dataContainer = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  dataContainer.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop)
  dataContainer.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  dataContainer.SetHidden(true)
  drawPanel(dataContainer, undefined, dataContainer, dataContainer)

  let offsetY = 0
  const rows: SkillRow[] = []

  for (let i = 0; i < 6; i++) {
    let sectionLabel: LabelControl | undefined

    if (SKILL_SECTION_LABELS[i] !== "") {
      sectionLabel = WINDOW_MANAGER.CreateControl(undefined, dataContainer, CT_LABEL)
      sectionLabel.SetAnchor(TOPLEFT, dataContainer, TOPLEFT, SKILL_SECTION_COL_LEFT, offsetY)
      sectionLabel.SetDimensions(SKILL_SECTION_COL_WIDTH, SKILL_ROW_HEIGHT)
      styleText(sectionLabel, "heading")
      sectionLabel.SetText(requireAt(SKILL_SECTION_LABELS, i, "SKILL_SECTION_LABELS"))
      sectionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      sectionLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    }

    const slotLabel = WINDOW_MANAGER.CreateControl(undefined, dataContainer, CT_LABEL)
    slotLabel.SetAnchor(TOPLEFT, dataContainer, TOPLEFT, SKILL_SLOT_COL_LEFT, offsetY)
    slotLabel.SetDimensions(SKILL_SLOT_COL_WIDTH, SKILL_ROW_HEIGHT)
    styleText(slotLabel, "label")
    slotLabel.SetText(requireAt(SKILL_SLOT_LABELS, i, "SKILL_SLOT_LABELS"))
    slotLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    slotLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

    const currentCard = createSkillMiniCard(dataContainer, SKILL_VALUE_COL_LEFT, offsetY)
    const optimalCard = createSkillMiniCard(dataContainer, SKILL_OPTIMAL_COL_LEFT, offsetY)
    optimalCard.container.SetHidden(true)

    rows.push({ sectionLabel, slotLabel, currentCard, optimalCard })
    offsetY = offsetY + SKILL_ROW_HEIGHT
  }

  skillsState = {
    panel,
    emptyState,
    dataContainer,
    rows,
  }

  return panel
}

function hideOptimalSkillsColumn(): undefined {
  if (!skillsState) return
  for (const row of skillsState.rows) {
    row.optimalCard.container.SetHidden(true)
  }
}

function refreshSkillsFromLive(): undefined {
  if (!skillsState) return

  for (let i = 0; i < SKILL_SLOT_INDICES.length; i++) {
    const slotIndex = requireAt(SKILL_SLOT_INDICES, i, "SKILL_SLOT_INDICES")
    const row = requireAt(skillsState.rows, i, "skillsState.rows")
    const abilityId = GetSlotBoundId(slotIndex, HOTBAR_CATEGORY_COMPANION)
    renderMiniCard(row.currentCard, abilityId)
  }
}

function refreshSkillsFromSaved(saved: SavedCompanionBuild): undefined {
  if (!skillsState) return

  for (let i = 0; i < skillsState.rows.length; i++) {
    const row = requireAt(skillsState.rows, i, "skillsState.rows")
    const abilityId = saved.skillAbilityIds[i] ?? 0
    renderMiniCard(row.currentCard, abilityId)
  }
}

function refreshOptimalSkillsColumn(decoded: CompanionBuildData): undefined {
  if (!skillsState) return

  for (let i = 0; i < skillsState.rows.length; i++) {
    const row = requireAt(skillsState.rows, i, "skillsState.rows")
    const skillIndex = decoded.skills[i] ?? 0
    const abilityId = getAbilityIdFromSkillIndex(skillIndex)
    renderMiniCard(row.optimalCard, abilityId)
    row.optimalCard.container.SetHidden(false)
  }
}

function refreshOptimalSkills(companionId: number): undefined {
  const hash = getTargetBuildHash(companionId)
  if (hash === undefined) {
    hideOptimalSkillsColumn()
    return
  }

  const decoded = decodeCompanionBuild(hash)
  if (decoded === undefined) {
    hideOptimalSkillsColumn()
    return
  }

  refreshOptimalSkillsColumn(decoded)
}

export function refreshCompanionSkillsPanel(): undefined {
  if (!skillsState) return

  const selectedCompanionId = getSelectedCompanionId()

  if (selectedCompanionId === undefined) {
    skillsState.emptyState.show("empty")
    skillsState.dataContainer.SetHidden(true)
    return
  }

  if (isSelectedCompanionActive()) {
    skillsState.emptyState.show("loaded")
    skillsState.dataContainer.SetHidden(false)
    refreshSkillsFromLive()
    refreshOptimalSkills(selectedCompanionId)
    return
  }

  const saved = getSavedCompanionBuild(selectedCompanionId)
  if (saved) {
    skillsState.emptyState.show("loaded")
    skillsState.dataContainer.SetHidden(false)
    refreshSkillsFromSaved(saved)
    refreshOptimalSkills(selectedCompanionId)
    return
  }

  const companionName = getCleanCompanionName(selectedCompanionId)
  skillsState.emptyState.show("empty", `Summon ${companionName} to capture their build.`)
  skillsState.dataContainer.SetHidden(true)
}
