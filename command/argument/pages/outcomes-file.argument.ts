import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const outcomesFile = {
  id: "01a1832c-ec75-7ce9-b6af-737ec0dbc0cf",
  type: "page-type/argument",
  slug: "outcomes-file",
  said: "--outcomes-file",
  takes: "the file a turn's outcome lines are read from whole, one json outcome to a line",
  value: "path",
  placeholder: "path",
  createdAt: "2026-10-28T15:42:01.844Z",
  updatedAt: "2026-10-28T15:42:01.844Z",
} as const satisfies Argument
