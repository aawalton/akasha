declare var TemperLeadsMainWindow: TopLevelWindow
declare var TemperLeadsMainWindowTitleAlerts: LabelControl
declare var TemperLeadsMainWindowLocationURL: LabelControl
declare var TemperLeadsLocationBox: EditControl

interface LeadsUnitData {
  Lead: string
  Zone: string
  ZoneId: number
  Location: string
  Diff: number
  Lore: number
  Dug: number
  Set: string
  SetId: number
  Expiration: number
  SetQuality: number
  HaveLead: boolean
  Repeatable: boolean
  Aid: number
}

interface LeadsRowLabel extends LabelControl {
  normalColor?: ZoColorDef
}

interface LeadsRowControl extends Control {
  data?: LeadsUnitData
  Lead?: LeadsRowLabel
  Zone?: LeadsRowLabel
  Location?: LeadsRowLabel
  Diff?: LeadsRowLabel
  Lore?: LeadsRowLabel
  Dug?: LeadsRowLabel
  Set?: LeadsRowLabel
  Expiration?: LeadsRowLabel
}
