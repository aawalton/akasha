import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const asRealUser = {
  id: "01a094c6-d2bb-719f-b86e-3714d6581579",
  type: "argument",
  slug: "as-real-user",
  said: "--as-real-user",
  takes: "sign in as Alan to read what only he can see, and change nothing through it",
  value: "none",
} as const satisfies Argument
