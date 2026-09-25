export const LOG_LEVEL_INFO = "I"
export const LOG_LEVEL_WARNING = "W"

type FightDataLog = (this: void, level: string, formatString: string, ...args: unknown[]) => void

let logFn: FightDataLog | undefined

export function setFightDataLog(fn: FightDataLog): undefined {
  logFn = fn
  return undefined
}

export function log(level: string, formatString: string, ...args: unknown[]): undefined {
  if (logFn !== undefined) logFn(level, formatString, ...args)
  return undefined
}
