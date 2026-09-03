import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const SIZE = /^(\d+)x(\d+)$/

const BOTH = z.tuple([z.coerce.number().int().positive(), z.coerce.number().int().positive()])

export interface Size {
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
