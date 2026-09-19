import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonStoplightsContent = {
  id: "01a0ba66-2533-72c0-888b-9c1707cf9a62",
  type: "page-type/ios-component",
  slug: "alanwalton-stoplights-content",
  definition: "what the stoplights live activity carries between the app and the extension",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The app and the extension compile this one file rather than a copy each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier is carried as the word the server sent.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what color a word is drawn in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The groups are carried apart, since the lock screen keeps them apart.",
    },
  ],
} as const satisfies IosComponent
