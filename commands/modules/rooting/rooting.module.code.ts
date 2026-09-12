import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"

export const MARKED = "akasha.domain.ts"

export const ROOT_NAMED = "AKASHA_ROOT"

export function rootIn(env: Readonly<Record<string, string | undefined>>, at: string): string {
  const stated = env[ROOT_NAMED]
  return stated === undefined || stated === "" ? rootOf(at) : resolve(stated)
}

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
