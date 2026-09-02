import { TEXT_PRIMARY, TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { createPlaceholderPanel } from "../characters-placeholder-panel/characters-placeholder-panel.module.code.ts"

export interface TabControl extends Control {
  label: LabelControl
  button: ButtonControl
}

export interface SubTabDefinition {
  id: string
  title: string
}

export interface TabDefinition {
  id: string
  title: string
  subTabs: SubTabDefinition[]
}

export const TAB_HEIGHT = 32
export const TAB_SPACING = 45
export const SUB_TAB_INDENT = 20
export const SUB_TAB_SPACING = 35
export const TAB_WIDTH = 220

export const TABS: TabDefinition[] = [
  {
    id: "character",
    title: "Character",
    subTabs: [
      { id: "character-character", title: "Character" },
      { id: "character-equipment", title: "Equipment" },
      { id: "character-skills", title: "Skills" },
      { id: "character-cp", title: "CP" },
      { id: "character-stats", title: "Stats" },
    ],
  },
]

export const TOP_TAB_CONTROLS: Record<string, TabControl> = {}
export const SUB_TAB_CONTROLS: Record<string, Record<string, TabControl>> = {}
export const SUB_TAB_PANELS: Record<string, Control> = {}
export let selectedTabId: string | undefined
export let selectedSubTabId: string | undefined
export let tabContainer: Control | undefined
export let contentContainer: Control | undefined

export const EXTERNAL_REFRESHERS: Record<string, () => void> = {}

export function updateTabPositions(): undefined {
  if (!tabContainer) return

  let offsetY = 0

  for (const tabDef of TABS) {
    const topTab = TOP_TAB_CONTROLS[tabDef.id]
    if (!topTab) continue

    topTab.ClearAnchors()
    topTab.SetAnchor(TOPLEFT, tabContainer, TOPLEFT, 0, offsetY)
    offsetY = offsetY + TAB_SPACING

    const isSelected = tabDef.id === selectedTabId
    const subControls = SUB_TAB_CONTROLS[tabDef.id]
    if (subControls !== undefined) {
      for (const subDef of tabDef.subTabs) {
        const subTab = subControls[subDef.id]
        if (!subTab) continue

        if (isSelected) {
          subTab.SetHidden(false)
          subTab.ClearAnchors()
          subTab.SetAnchor(TOPLEFT, tabContainer, TOPLEFT, SUB_TAB_INDENT, offsetY)
          offsetY = offsetY + SUB_TAB_SPACING
        } else {
          subTab.SetHidden(true)
        }
      }
    }
  }
}

export function selectSubTab(parentTabId: string, subTabId: string): undefined {
  selectedSubTabId = subTabId

  getSavedVariables().navigation.selectedSubTab = subTabId

  const subControls = SUB_TAB_CONTROLS[parentTabId]
  if (subControls !== undefined) {
    for (const [id, subTab] of Object.entries(subControls)) {
      const c = id === subTabId ? TEXT_PRIMARY : TEXT_SECONDARY
      subTab.label.SetColor(c[0], c[1], c[2], 1)
    }
  }

  for (const [id, panel] of Object.entries(SUB_TAB_PANELS)) {
    panel.SetHidden(id !== subTabId)
  }

  refreshActivePanel()
}

export function refreshActivePanel(): undefined {
  if (selectedSubTabId === undefined) return
  const refresher = EXTERNAL_REFRESHERS[selectedSubTabId]
  if (refresher !== undefined) {
    refresher()
  }
}

export function selectTopTab(tabId: string, subTabId?: string): undefined {
  selectedTabId = tabId

  getSavedVariables().navigation.selectedTab = tabId

  for (const [id, tab] of Object.entries(TOP_TAB_CONTROLS)) {
    const c = id === tabId ? TEXT_PRIMARY : TEXT_SECONDARY
    tab.label.SetColor(c[0], c[1], c[2], 1)
  }

  updateTabPositions()

  const tabDef = TABS.find((t) => t.id === tabId)
  if (!tabDef) return

  let targetSubTab = subTabId
  if (targetSubTab === undefined || !tabDef.subTabs.find((s) => s.id === targetSubTab)) {
    targetSubTab = requireFirst(tabDef.subTabs, "tabDef.subTabs").id
  }

  selectSubTab(tabId, targetSubTab)
}

function createTabControl(args: {
  parent: Control
  width: number
  offsetX: number
  offsetY: number
  hidden: boolean
  font: string
  title: string
  isSelected: (this: void) => boolean
  onClicked: (this: void) => undefined
}): TabControl {
  const base = WINDOW_MANAGER.CreateControl(undefined, args.parent, CT_CONTROL)
  base.SetDimensions(args.width, TAB_HEIGHT)
  base.SetAnchor(TOPLEFT, args.parent, TOPLEFT, args.offsetX, args.offsetY)
  base.SetHidden(args.hidden)

  const label = WINDOW_MANAGER.CreateControl(undefined, base, CT_LABEL)
  label.SetAnchor(TOPLEFT, base, TOPLEFT, 0, 0)
  label.SetFont(args.font)
  label.SetText(string.upper(args.title))
  label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)

  const button = WINDOW_MANAGER.CreateControl(undefined, base, CT_BUTTON)
  button.SetAnchorFill()
  button.SetHandler("OnClicked", args.onClicked)
  button.SetHandler("OnMouseEnter", () => {
    if (!args.isSelected()) {
      label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    }
  })
  button.SetHandler("OnMouseExit", () => {
    if (!args.isSelected()) {
      label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    }
  })

  const tab: TabControl = Object.assign(base, { label, button })
  return tab
}

export function createSubTab(
  parent: Control,
  subDef: SubTabDefinition,
  parentTabId: string
): TabControl {
  return createTabControl({
    parent,
    width: TAB_WIDTH - SUB_TAB_INDENT,
    offsetX: SUB_TAB_INDENT,
    offsetY: 0,
    hidden: true,
    font: "ZoFontWinH3",
    title: subDef.title,
    isSelected: () => selectedSubTabId === subDef.id,
    onClicked: () => {
      selectSubTab(parentTabId, subDef.id)
    },
  })
}

export function createTab(parent: Control, offsetY: number, tabDef: TabDefinition): TabControl {
  return createTabControl({
    parent,
    width: TAB_WIDTH,
    offsetX: 0,
    offsetY,
    hidden: false,
    font: "ZoFontWinH2",
    title: tabDef.title,
    isSelected: () => selectedTabId === tabDef.id,
    onClicked: () => {
      selectTopTab(tabDef.id)
    },
  })
}

function addTab(
  container: Control,
  content: Control,
  tabDef: TabDefinition,
  offsetY: number,
  creators: Record<string, (container: Control) => Control>
): undefined {
  TOP_TAB_CONTROLS[tabDef.id] = createTab(container, offsetY, tabDef)

  const subControls: Record<string, TabControl> = {}
  SUB_TAB_CONTROLS[tabDef.id] = subControls
  for (const subDef of tabDef.subTabs) {
    subControls[subDef.id] = createSubTab(container, subDef, tabDef.id)
    const creator = creators[subDef.id]
    SUB_TAB_PANELS[subDef.id] =
      creator === undefined ? createPlaceholderPanel(content) : creator(content)
  }
}

export function initializeTabs(container: Control, content: Control): undefined {
  tabContainer = container
  contentContainer = content
  let offsetY = 0

  for (const tabDef of TABS) {
    addTab(container, content, tabDef, offsetY, {})
    offsetY = offsetY + TAB_SPACING
  }

  const savedVars = getSavedVariables()
  const initialTab = savedVars.navigation.selectedTab ?? requireFirst(TABS, "TABS").id
  const initialSubTab = savedVars.navigation.selectedSubTab ?? undefined
  selectTopTab(initialTab, initialSubTab)
}

export function registerExternalTab(
  tabDef: TabDefinition,
  creators: Record<string, (container: Control) => Control>,
  refreshers: Record<string, () => void>
): undefined {
  if (!tabContainer || !contentContainer) return

  TABS.push(tabDef)
  addTab(tabContainer, contentContainer, tabDef, 0, creators)

  for (const [id, refresher] of Object.entries(refreshers)) {
    EXTERNAL_REFRESHERS[id] = refresher
  }

  updateTabPositions()

  if (selectedTabId !== undefined) {
    selectTopTab(selectedTabId, selectedSubTabId)
  }
}
