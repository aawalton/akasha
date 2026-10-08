import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const outDir = {
  id: "01a094d1-2bfb-719b-a741-e65918a5419f",
  type: "page-type/argument",
  slug: "out-dir",
  said: "--out-dir",
  takes: "where the PNGs are written, a folder beside the clip named for it where none is said",
  value: "path",
  placeholder: "dir",
  createdAt: "2026-09-12T08:52:11.387Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
