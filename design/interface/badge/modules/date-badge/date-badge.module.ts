import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dateBadge = {
  id: "01a05b55-a539-773f-8b28-749123c7df39",
  type: "module",
  slug: "date-badge",
  definition: "a badge showing a date and opening a calendar to change it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dashed date is read and written here rather than by each badge showing one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dashed date is read and written in the zone the browser is in.",
    },
  ],
} as const satisfies Module
