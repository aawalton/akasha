import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const everyLine = {
  id: "01a094ed-ec67-768a-9b83-eeee39dcb276",
  type: "page-type/argument",
  slug: "every-line",
  said: "--all",
  takes: "every line inside the window, page after page, rather than the first `--limit`",
  value: "none",
} as const satisfies Argument
