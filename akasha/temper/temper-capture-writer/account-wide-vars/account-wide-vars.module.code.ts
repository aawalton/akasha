import "@akasha/temper-eso-types/eso-api"

export interface AccountWideSavedVars<T> {
  initializeSavedVariables: (this: void) => T
  getSavedVariables: (this: void) => T
}

export function makeAccountWideSavedVars<T extends object>(
  name: string,
  version: number | string,
  defaults: T
): AccountWideSavedVars<T> {
  let instance: T | undefined

  function initializeSavedVariables(this: void): T {
    instance = ZO_SavedVars.NewAccountWide(name, version, undefined, defaults)
    return instance
  }

  function getSavedVariables(this: void): T {
    if (!instance) {
      throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
    }
    return instance
  }

  return { initializeSavedVariables, getSavedVariables }
}
