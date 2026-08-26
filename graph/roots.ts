import { resolve } from "node:path"
import type { Roots } from "./node-shape.ts"

export const AKASHA = "akasha"

export const INSTRUCTIONS = "instructions"

export const HERE = resolve(import.meta.dir, "..")

const SIBLING = process.env.INSTRUCTIONS_ROOT ?? resolve(HERE, "..", INSTRUCTIONS)

export const ROOTS_HERE: Roots = { [AKASHA]: HERE, [INSTRUCTIONS]: SIBLING }

export function rootsOver(akasha: string): Roots {
  return { [AKASHA]: akasha, [INSTRUCTIONS]: SIBLING }
}
