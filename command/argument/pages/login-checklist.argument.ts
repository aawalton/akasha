import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const loginChecklist = {
  id: "01a094d4-1396-7d86-942f-8634257c1ade",
  type: "page-type/argument",
  slug: "login-checklist",
  said: "--checklist",
  takes: "give the login and venue-stop checklist rather than the plan the addon shows",
  value: "none",
  createdAt: "2026-09-12T08:55:21.750Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
