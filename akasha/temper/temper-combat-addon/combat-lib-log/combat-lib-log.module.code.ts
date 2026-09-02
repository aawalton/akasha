export const LOG_LEVEL_VERBOSE = "V"
export const LOG_LEVEL_DEBUG = "D"
export const LOG_LEVEL_INFO = "I"
export const LOG_LEVEL_WARNING = "W"
export const LOG_LEVEL_ERROR = "E"

export type LibCombatLog = (
  this: void,
  category: string,
  level: string,
  formatString: string,
  ...args: unknown[]
) => void

let logFn: LibCombatLog | undefined

export function setLibCombatLog(fn: LibCombatLog): undefined {
  logFn = fn
  return undefined
}

export function log(
  category: string,
  level: string,
  formatString: string,
  ...args: unknown[]
): undefined {
  if (level === LOG_LEVEL_DEBUG || level === LOG_LEVEL_VERBOSE) return undefined
  if (logFn !== undefined) logFn(category, level, formatString, ...args)
  return undefined
}
