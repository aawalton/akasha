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
