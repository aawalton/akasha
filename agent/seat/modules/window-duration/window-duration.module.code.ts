import { InputError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const DURATION_MULTIPLIERS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
} satisfies Record<string, number>

export function parseWindowDuration(value: string, flagName = "--window"): number {
  const match = SHAPE.tuple([SHAPE.string(), SHAPE.string(), SHAPE.enum(["s", "m", "h", "d"])])
    .nullable()
    .parse(value.match(/^(\d+)\s*(s|m|h|d)$/))
  if (!match) {
    throw new InputError(
      `${flagName}: invalid duration "${value}" — expected format like "15m", "1h", "2d" (units: s, m, h, d)`
    )
  }
  return Number(match[1]) * DURATION_MULTIPLIERS[match[2]]
}
