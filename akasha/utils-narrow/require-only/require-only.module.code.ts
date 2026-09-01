import { NarrowError } from "../narrow-error/narrow-error.module.code.ts"

export function requireOnly<T>(array: readonly T[], label?: string): T {
  if (array.length !== 1) {
    throw new NarrowError(
      `requireOnly: expected exactly 1 element${label !== undefined ? ` in ${label}` : ""}, got ${array.length}`
    )
  }
  for (const value of array) return value
  throw new NarrowError(`requireOnly: unreachable${label !== undefined ? ` in ${label}` : ""}`)
}
