import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const loginChecklist = {
  id: "01a094d4-1396-7d86-942f-8634257c1ade",
  type: "argument",
  slug: "login-checklist",
  said: "--checklist",
  takes: "give the login and venue-stop checklist rather than the plan the addon shows",
  value: "none",
} as const satisfies Argument
