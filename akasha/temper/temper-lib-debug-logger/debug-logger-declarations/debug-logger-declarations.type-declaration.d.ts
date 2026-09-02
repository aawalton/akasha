interface LuaStringLib {
  format: (this: void, formatter: string, ...args: unknown[]) => string
  sub: (this: void, subject: string, from: number, to?: number) => string
  lower: (this: void, subject: string) => string
  find: (this: void, subject: string, pattern: string) => [number | undefined, number | undefined]
  match: (this: void, subject: string, pattern: string) => [string | undefined, string | undefined]
}

interface LuaTableLib {
  concat: (this: void, list: readonly (string | number)[], separator?: string) => string
}

interface LuaMathLib {
  max: (this: void, ...values: number[]) => number
}

interface LuaOsLib {
  date: (this: void, formatter: string, at?: number) => string
  time: (this: void) => number
}

interface ZoPreHook {
  (
    this: void,
    existingFunctionName: string,
    hookFunction: (this: void, ...args: unknown[]) => unknown
  ): ((this: void, ...args: unknown[]) => unknown) | undefined
  (
    this: void,
    objectTable: Record<string, unknown>,
    existingFunctionName: string,
    hookFunction: (this: void, ...args: unknown[]) => unknown
  ): ((this: void, ...args: unknown[]) => unknown) | undefined
}

interface LibChatMessageInstance {
  Print: (message: string) => void
  Printf: (formatter: string, ...args: unknown[]) => void
}

interface EventManagerInstance {
  RegisterForEvent: (
    this: EventManagerInstance,
    namespace: string,
    event: number,
    handler: (this: void, ...args: never[]) => unknown
  ) => boolean
}

interface ChatRouterInstance {
  AddSystemMessage: (this: ChatRouterInstance, message: string) => void
}

interface GuiRootControl {
  GetWidth: (this: GuiRootControl) => number
  GetHeight: (this: GuiRootControl) => number
}

interface AddOnManagerInstance {
  GetNumAddOns: (this: AddOnManagerInstance) => number
  GetAddOnInfo: (
    this: AddOnManagerInstance,
    index: number
  ) => [string, string, string, string, boolean, number]
  GetAddOnVersion: (this: AddOnManagerInstance, index: number) => number
  GetAddOnRootDirectoryPath: (this: AddOnManagerInstance, index: number) => string
  GetAddOnNumDependencies: (this: AddOnManagerInstance, index: number) => number
  GetAddOnDependencyInfo: (
    this: AddOnManagerInstance,
    index: number,
    dependencyIndex: number
  ) => [string, boolean, boolean, number, number]
  GetLoadOutOfDateAddOns: (this: AddOnManagerInstance) => boolean
}
