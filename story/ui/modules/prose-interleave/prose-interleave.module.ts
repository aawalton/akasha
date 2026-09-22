import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseInterleave = {
  id: "01a0628e-a5db-76a3-a903-872df67354e9",
  type: "page-type/module",
  slug: "prose-interleave",
  definition:
    "a turn's prose broken at its markers with that turn's system beats set in the breaks",
  code: "ts",
  test: "ts",
} as const satisfies Module
