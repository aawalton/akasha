declare global {
  const ZO_AlchemyTopLevel: Control

  const ZO_SharedRightPanelBackground: Control

  interface AlchemyStation {
    mode: number | string
    modeBar: Control
    modeBarLabel: LabelControl
    control: Control
    SetMode: (this: AlchemyStation, mode: number | string) => undefined
  }

  const ALCHEMY: AlchemyStation
}

export {}
