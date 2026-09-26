declare const TemperCombatAlertsCCJetRightLabel: LabelControl
declare const TemperCombatAlertsCCJetLeftLabel: LabelControl
declare const TemperCombatAlertsCCUIMinNumber: LabelControl
declare const TemperCombatAlertsCCUIObnoxiousNumber: LabelControl

interface TranslateAnimation {
  SetDuration: (durationMs: number) => void
}

interface ZoTimeline {
  PlayFromStart: (this: ZoTimeline, offsetMs?: number) => void
}
