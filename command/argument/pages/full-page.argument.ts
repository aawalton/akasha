import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fullPage = {
  id: "01a0c4c8-677a-73f0-982e-d26f4258b10d",
  type: "page-type/argument",
  slug: "full-page",
  said: "--full-page",
  takes: "the whole scrolling page rather than what the window holds",
  value: "none",
} as const satisfies Argument
