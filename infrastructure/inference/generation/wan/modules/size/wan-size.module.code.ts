import { requireMatchPositional } from "akasha/code/type/narrowing/modules/require-match-positional/require-match-positional.module.code.ts"
import { z } from "zod"

const SIZE = /^(\d+)x(\d+)$/

const BOTH = z.tuple([z.coerce.number().int().positive(), z.coerce.number().int().positive()])

interface Size {
  readonly width: number
  readonly height: number
}

export function parseSizeOrNull(raw: string): Size | null {
  try {
    const [width, height] = requireMatchPositional(SIZE, BOTH, raw, "--size")
    return { width, height }
  } catch {
    return null
  }
}
