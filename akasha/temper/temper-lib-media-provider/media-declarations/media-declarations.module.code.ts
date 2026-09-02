declare global {
  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function error(this: void, message: string, level?: number): never

  function d(this: void, ...args: unknown[]): undefined

  var GetCVar: (this: void, name: string) => string

  var IsConsoleUI: (this: void) => boolean

  var ZoGetOfficialGameLanguageDescriptor: (this: void) => string

  var ZO_DeepTableCopy: <T>(this: void, source: T, target?: object) => T

  var SOUNDS: Readonly<Record<string, string>>

  interface CallbackManagerInstance {
    FireCallbacks: (this: CallbackManagerInstance, callbackName: string, ...args: unknown[]) => void
    RegisterCallback: (
      this: CallbackManagerInstance,
      callbackName: string,
      callback: (this: void, ...args: never[]) => void
    ) => void
    UnregisterCallback: (
      this: CallbackManagerInstance,
      callbackName: string,
      callback?: (this: void, ...args: never[]) => void
    ) => void
  }

  var CALLBACK_MANAGER: CallbackManagerInstance
}

export {}
