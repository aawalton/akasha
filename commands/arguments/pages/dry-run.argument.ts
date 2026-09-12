import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const dryRun = {
  id: "01a0940b-b3ad-7c34-aa15-e18d5160f624",
  type: "argument",
  slug: "dry-run",
  said: "--dry-run",
  takes: "judge what the act would land and write nothing",
  value: "none",
} as const satisfies Argument
