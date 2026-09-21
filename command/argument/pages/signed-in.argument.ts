import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const signedIn = {
  id: "01a0c4c4-0152-7600-be8a-c74054fd0caa",
  type: "page-type/argument",
  slug: "signed-in",
  said: "--signed-in",
  takes: "open the browser signed in as Alan rather than as nobody",
  value: "none",
} as const satisfies Argument
