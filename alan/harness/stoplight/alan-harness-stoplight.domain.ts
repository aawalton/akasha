import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanHarnessStoplight = {
  id: "01a0655b-9cdd-7169-bede-e916a8a6bd42",
  type: "page-type/domain",
  slug: "alan-harness-stoplight",
  definition: "how Alan's stoplights are shown",
  parts: ["module/stoplights-activity-content"],
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The app's live activity decodes its content under three group slugs its Swift names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "ActivityKit decodes content into a type built into the app, so its keys move only in a build.",
    },
  ],
} as const satisfies Domain
