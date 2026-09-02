interface TemperLeadsApi {
  toggleRDL: (this: void, extra?: string) => undefined
  SetupDropdown: (this: void, control: Control) => undefined
  DropdownShowTooltip: (
    this: void,
    control: Control,
    dropdownName: string,
    reAnchor: boolean
  ) => undefined
  DropdownHideTooltip: (this: void, control: Control) => undefined
  HeaderMouseEnter: (this: void, control: Control, tooltipIndex: number | undefined) => undefined
  HeaderMouseExit: (this: void, control: Control, tooltipIndex: number | undefined) => undefined
  RowMouseEnter: (this: void, control: LeadsRowControl) => undefined
  RowMouseExit: (this: void, control: LeadsRowControl) => undefined
  RowMouseUp: (this: void, control: LeadsRowControl) => undefined
  LeadfoundMouseEnter: (this: void, control: Control) => undefined
  LeadfoundMouseExit: (this: void, control: Control) => undefined
  AlertsMouseEnter: (this: void, control: Control) => undefined
  AlertsMouseExit: (this: void, control: Control) => undefined
  LocationBoxMouseEnter: (this: void, control: Control) => undefined
  LocationBoxMouseExit: (this: void, control: Control) => undefined
  transmogrify: (this: void) => undefined
  SORTHEADER_NAMES: readonly string[]
  getAntiquityDigZoneName: (this: void, antiquityId: number) => string | undefined
}

declare var TemperLeads: TemperLeadsApi | undefined
