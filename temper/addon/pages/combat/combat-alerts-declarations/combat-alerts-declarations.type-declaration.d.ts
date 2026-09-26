declare var TemperCombatAlerts: import("akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts").CrutchHub

declare var TemperCombatAlertsSavedVariables: Record<string, unknown> | undefined
declare var TemperCombatAlertsInstallationWide: Record<string, unknown> | undefined

declare const TemperCombatAlertsOptions: Control | undefined

declare const CrutchAlertsExtensions: unknown

interface LibFilteredChatPanelFilter {
  AddMessage: (message: string) => void
}

interface LibFilteredChatPanelLibrary {
  CreateFilter: (
    name: string,
    icon: string,
    color: readonly number[],
    enabled: boolean
  ) => LibFilteredChatPanelFilter
}

declare const LibFilteredChatPanel: LibFilteredChatPanelLibrary | undefined

declare const TemperCombatAlertsContainer: TopLevelWindow
declare const TemperCombatAlertsContainerBackdrop: BackdropControl
declare const TemperCombatAlertsDamageable: TopLevelWindow
declare const TemperCombatAlertsDamageableBackdrop: BackdropControl
declare const TemperCombatAlertsDamageableLabel: LabelControl
declare const TemperCombatAlertsProminent1: TopLevelWindow
declare const TemperCombatAlertsProminent2: TopLevelWindow
declare const TemperCombatAlertsProminent3: TopLevelWindow
declare const TemperCombatAlertsProminent4: TopLevelWindow
declare const TemperCombatAlertsInfoPanel: TopLevelWindow
declare const TemperCombatAlertsDrawing: TopLevelWindow
declare const TemperCombatAlertsDrawingCamera: Control
declare const TemperCombatAlertsSpace: TopLevelWindow
declare const TemperCombatAlertsBossHealthBarContainer: TopLevelWindow
declare const TemperCombatAlertsCC: TopLevelWindow
declare const TemperCombatAlertsCCUIMin: TopLevelWindow
declare const TemperCombatAlertsCCUIObnoxious: TopLevelWindow
declare const TemperCombatAlertsCCJetLeft: Control & {
  slideAnimation: ZoTimeline
  slide: TranslateAnimation
}
declare const TemperCombatAlertsCCJetRight: Control & {
  slideAnimation: ZoTimeline
  slide: TranslateAnimation
}
declare const TemperCombatAlertsCloudrest: TopLevelWindow
declare const TemperCombatAlertsCloudrestBackdrop: BackdropControl
declare const TemperCombatAlertsMawOfLorkhaj: TopLevelWindow
declare const TemperCombatAlertsCausticCarrion: TopLevelWindow
declare const TemperCombatAlertsCausticCarrionBar: StatusBarControl
declare const TemperCombatAlertsCausticCarrionStacks: LabelControl
declare const TemperCombatAlertsCausticCarrionText: LabelControl
declare const TemperCombatAlertsCausticCarrionTitle: LabelControl
