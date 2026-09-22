interface TemperFCOChangeStuffGlobal extends Record<string, unknown> {
  openLAMAddonSettings: (this: void) => undefined
  playerPinPingPong: (this: void, fromKeybind?: boolean) => undefined
  keybinds: (this: void, keybindType: string) => undefined
  muteSFXSound: (this: void) => undefined
  toggleGroupElectionAutoDecline: (this: void) => undefined
  switchBankMenuBarDescriptor: (this: void) => undefined
  TogglePromotionalEventTrackerUI: (this: void) => undefined
  ScrollScrollList: (this: void, scrollBarButton: Control | undefined, top: boolean) => undefined
}

declare var TemperFCOChangeStuff: TemperFCOChangeStuffGlobal
