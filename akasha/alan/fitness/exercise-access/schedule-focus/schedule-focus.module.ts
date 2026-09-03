import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const scheduleFocus = {
  id: "01a0685d-cca7-73a3-94de-94d4200b1c81",
  pageTypeSlug: "module",
  slug: "schedule-focus",
  definition: "what the rotation trains on a day, and how long since each focus was last trained",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One schedule is active, and a day is read against that one.",
    },
    {
      invariantKind: "departure",
      statement: "A day taking rest names no focus rather than naming rest as one.",
    },
    {
      invariantKind: "departure",
      statement: "A focus is trained on whichever days of the rotation carry it.",
    },
    {
      invariantKind: "departure",
      statement: "A session belongs to a focus through the schedule day the session names.",
    },
    {
      invariantKind: "departure",
      statement: "A focus never trained states no last day rather than states a day long past.",
    },
    {
      invariantKind: "departure",
      statement: "A focus is counted once however many days of the rotation carry it.",
    },
  ],
} as const satisfies Module
