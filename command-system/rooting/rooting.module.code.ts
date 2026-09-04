import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"

export const MARKED = "akasha.domain.ts"

export function rootOf(at: string): string {
  let held = resolve(at)
  let up = dirname(held)
  while (!existsSync(join(held, MARKED))) {
    if (up === held) {
      throw new Error(`${at} is under no akasha folder holding ${MARKED}`)
    }
    held = up
    up = dirname(held)
  }
  return held
}
