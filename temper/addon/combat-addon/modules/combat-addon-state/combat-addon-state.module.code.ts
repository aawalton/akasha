let IN_COMBAT = false

export function isInCombat(): boolean {
  return IN_COMBAT
}

export function setInCombat(value: boolean): undefined {
  IN_COMBAT = value
  return undefined
}

let INITIALIZED = false

export function isInitialized(): boolean {
  return INITIALIZED
}

export function setInitialized(value: boolean): undefined {
  INITIALIZED = value
  return undefined
}
