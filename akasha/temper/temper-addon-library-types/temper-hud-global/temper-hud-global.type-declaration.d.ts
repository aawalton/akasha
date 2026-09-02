interface TemperHudApi {
  registerHideableComponent: (
    this: void,
    id: string,
    resolve: (this: void) => unknown,
    reason: string
  ) => undefined
  setComponentHidden: (this: void, id: string, hidden: boolean) => undefined
  registerCommand: (
    this: void,
    command: {
      name: string
      description: string
      addon: string
      handler?: (this: void, args: string) => undefined
    }
  ) => undefined
}

declare var TemperHud: TemperHudApi | undefined
