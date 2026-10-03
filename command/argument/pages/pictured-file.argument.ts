import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const picturedFile = {
  id: "01a1030e-5e62-7a0a-bf11-64418c4a1391",
  type: "page-type/argument",
  slug: "pictured-file",
  said: "--pictured-file",
  takes: "the file a written chapter's pictures are read from, one json picture to a line",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
