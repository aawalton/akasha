export interface LoreBooksReportState {
  reportShown: boolean
  copyReport: string
  eideticModeAsked: number | undefined
  loreLibraryReportKeybind: KeybindButtonGroupDescriptor[] | undefined
}

export const REPORT_STATE: LoreBooksReportState = {
  reportShown: false,
  copyReport: "",
  eideticModeAsked: undefined,
  loreLibraryReportKeybind: undefined,
}
