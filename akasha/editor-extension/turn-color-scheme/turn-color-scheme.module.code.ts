import { PALETTE_NAMES } from "../palette/palette.module.code.ts"

export const TURN_SCHEME_PATH = "turn"

export const COLOR_ID_PREFIX = "ops.color."

export function turnColorIn(path: string): string | undefined {
  const found = /^\/(?:turn|subagent)\/([a-z-]+)\//.exec(path)
  if (found === null) {
    return undefined
  }
  const name = found[1] ?? ""
  return PALETTE_NAMES.has(name) ? `${COLOR_ID_PREFIX}${name}` : undefined
}

export function turnStateSaid(
  state: string | undefined,
  waitingOn: string | undefined
): string | undefined {
  if (state === undefined || state === "unknown") {
    return undefined
  }
  return waitingOn === undefined ? state : `${state} on ${waitingOn}`
}
