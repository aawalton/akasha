import type { Module } from "@akasha/code-system/module"

export const leadsReporting = {
  id: "01a06274-b08a-73da-8f48-24bcfd5a231a",
  pageTypeSlug: "module",
  slug: "leads-reporting",
  definition: "the lead last found, and the report of a new location for it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A location is sent to an external site rather than kept here.",
    },
    {
      invariantKind: "departure",
      statement: "The player consents to the browser opening before anything is sent.",
    },
  ],
} as const satisfies Module
