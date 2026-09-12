import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const outDir = {
  id: "01a094d1-2bfb-719b-a741-e65918a5419f",
  type: "argument",
  slug: "out-dir",
  said: "--out-dir",
  takes: "where the PNGs are written, a folder beside the clip named for it where none is said",
  value: "path",
  placeholder: "dir",
} as const satisfies Argument
