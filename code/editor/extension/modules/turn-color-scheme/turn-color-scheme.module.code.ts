import {
  PALETTE_NAMES,
  PALETTE_ORDER,
} from "akasha/code/editor/extension/modules/palette/palette.module.code.ts"

interface ColorTally {
  readonly count: number
  readonly colorId: string
}

export const TURN_SCHEME_PATH = "turn"

export const COLOR_ID_PREFIX = "ops.color."

function parsePaletteName(found: RegExpExecArray | null): string {
  return found?.[1] ?? ""
}

export function turnColorIn(path: string): string | undefined {
  const name = parsePaletteName(/^\/(?:turn|subagent|stopped)\/([a-z-]+)\//.exec(path))
  return PALETTE_NAMES.has(name) ? `${COLOR_ID_PREFIX}${name}` : undefined
}

export function colorTallyIn(
  children: readonly { readonly color?: string | null }[]
): readonly ColorTally[] {
  const held = new Map<string, number>()
  for (const child of children) {
    const color = child.color ?? null
    if (color === null) continue
    held.set(color, (held.get(color) ?? 0) + 1)
  }
  return PALETTE_ORDER.filter((name) => held.has(name)).map((name) => ({
    count: held.get(name) ?? 0,
    colorId: `${COLOR_ID_PREFIX}${name}`,
  }))
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
