import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"

export const SAVED_VARIABLES_NAME = "TemperCharactersPithkaSavedVariables"

export type CallbackValues = {
  showWatermark?: boolean
  showGroupFinder?: boolean
  currentScreen?: string
  currentTray?: string
  groupFinderHealer?: boolean
  groupFinderTank?: boolean
  groupFinderDps?: boolean
  groupFinderDungeons?: boolean
  groupFinderTrials?: boolean
  groupFinderNormal?: boolean
  groupFinderVeteran?: boolean
  runGroupFinder?: boolean
}

export type CallbackKey = keyof CallbackValues

export type PithkaSavedVariables = {
  scores: Record<string, Record<string, number> | undefined>
  groupFinderUsage: { joiningAttempts?: number }
  valuesWithCallbacks: CallbackValues
}

export type SavedVarsCallback = (this: void, key: CallbackKey, value: unknown) => void

const CALLBACKS: SavedVarsCallback[] = []

let db: PithkaSavedVariables | undefined

export function initializeSavedVars(this: void): undefined {
  db = ZO_SavedVars.NewAccountWide<PithkaSavedVariables>(SAVED_VARIABLES_NAME, 1, undefined, {
    scores: {},
    groupFinderUsage: {
      joiningAttempts: 0,
    },
    valuesWithCallbacks: {
      showWatermark: false,
      showGroupFinder: false,
      currentScreen: "4 Man Trifectas",
      currentTray: "Export",
      groupFinderHealer: true,
      groupFinderTank: true,
      groupFinderDps: true,
      groupFinderDungeons: true,
      groupFinderTrials: true,
      groupFinderNormal: true,
      groupFinderVeteran: true,
      runGroupFinder: true,
    },
  })
}

export function savedVarsDb(this: void): PithkaSavedVariables | undefined {
  return db
}

export function registerCallback(this: void, fn: SavedVarsCallback): undefined {
  CALLBACKS.push(fn)
}

export function getValue<K extends CallbackKey>(this: void, key: K): CallbackValues[K] {
  return db?.valuesWithCallbacks[key]
}

export function setValue<K extends CallbackKey>(
  this: void,
  key: K,
  value: CallbackValues[K]
): undefined {
  if (db !== undefined) db.valuesWithCallbacks[key] = value
  for (const fn of CALLBACKS) fn(key, value)
}

function linkWatermarkToGroupFinder(this: void, key: CallbackKey, value: unknown): undefined {
  if (key === "showGroupFinder" && value === true) {
    setValue("showWatermark", false)
  } else if (key === "showWatermark" && value === true) {
    setValue("showGroupFinder", false)
  }
}

registerCallback(linkWatermarkToGroupFinder)
