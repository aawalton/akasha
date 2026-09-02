interface WorldMapFilterControlPool {
  parent?: Control
  m_Active: Record<number, Control>
  AcquireObject: (this: WorldMapFilterControlPool) => Control
}

interface WorldMapFilterPanel {
  checkBoxPool?: WorldMapFilterControlPool
  comboBoxPool?: WorldMapFilterControlPool
  control?: Control
  AnchorControl: (this: WorldMapFilterPanel, control: Control) => void
}

interface WorldMapFiltersObject {
  pvePanel?: WorldMapFilterPanel
  pvpPanel?: WorldMapFilterPanel
  imperialPvPPanel?: WorldMapFilterPanel
  battlegroundPanel?: WorldMapFilterPanel
}
declare const WORLD_MAP_FILTERS: WorldMapFiltersObject

declare const ZO_CheckButton_SetCheckState: (
  this: void,
  checkButton: Control,
  checked: boolean
) => void

declare const ZO_WorldMapFiltersPvE: Control | undefined
declare const ZO_WorldMapFiltersPvEContainer: Control | undefined
declare const ZO_WorldMapFiltersPvEContainerScrollChild: Control | undefined
declare const ZO_WorldMapFiltersPvECheckBox1: Control | undefined
declare const ZO_WorldMapFiltersPvEComboBox1: Control | undefined

declare const ZO_WorldMapFiltersPvP: Control | undefined
declare const ZO_WorldMapFiltersPvPContainer: Control | undefined
declare const ZO_WorldMapFiltersPvPContainerScrollChild: Control | undefined
declare const ZO_WorldMapFiltersPvPCheckBox1: Control | undefined
declare const ZO_WorldMapFiltersPvPComboBox1: Control | undefined

declare const ZO_WorldMapFiltersImperialPvP: Control | undefined
declare const ZO_WorldMapFiltersImperialPvPContainer: Control | undefined
declare const ZO_WorldMapFiltersImperialPvPContainerScrollChild: Control | undefined
declare const ZO_WorldMapFiltersImperialPvPCheckBox1: Control | undefined
declare const ZO_WorldMapFiltersImperialPvPComboBox1: Control | undefined

interface MapPin {
  GetPinTypeAndTag: () => LuaMultiReturn<[pinTypeId: number, pinTag: unknown]>
}

declare const SI_GAMEPAD_PLAYER_PROGERSS_BAR_UNKNOWN_ZONE: number
declare const SI_SPECIALIZEDITEMTYPE213: number
declare const SI_ZONECOMPLETIONTYPE12: number
declare const SI_MONSTERSOCIALCLASS42: number
declare const SI_MONSTERSOCIALCLASS45: number
declare const SI_JOURNAL_MENU_ACHIEVEMENTS: number
