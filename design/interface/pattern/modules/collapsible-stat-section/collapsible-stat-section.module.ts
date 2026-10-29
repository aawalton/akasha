import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collapsibleStatSection = {
  id: "01a18808-2fa4-758d-85cf-8b29bf18675b",
  type: "page-type/module",
  slug: "collapsible-stat-section",
  definition: "a titled run of stat rows a click folds shut",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The heading is a stat row, with a chevron at its right that turns as the section opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section starts closed, as a group in Temper's completion panel does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The heading's space to its first row is the space between two rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a section is open is the caller's to keep, or the section's where the caller keeps none.",
    },
  ],
  createdAt: "2026-10-29T14:20:50.000Z",
  updatedAt: "2026-10-29T14:20:50.000Z",
} as const satisfies Module
