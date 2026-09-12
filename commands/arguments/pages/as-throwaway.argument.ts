import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const asThrowaway = {
  id: "01a094cc-1c6f-7643-a55b-a70345315ca0",
  type: "argument",
  slug: "as-throwaway",
  said: "--as-throwaway",
  takes: "look as the throwaway user rather than the live one",
  value: "none",
} as const satisfies Argument
