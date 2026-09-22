import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const harnessSettingsReading = {
  id: "01a08e0b-50f6-74fe-b9fc-1347ef93435b",
  type: "page-type/module",
  slug: "harness-settings-reading",
  definition: "the settings body beside an agent-settings page, read and narrowed to its shape",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the settings page sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings body is the file beside that page rather than a second path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A settings page nothing is slugged for refuses, and the refusal says what is unknown for want of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is narrowed by the shape its reader hands in rather than by one here.",
    },
  ],
} as const satisfies Module
