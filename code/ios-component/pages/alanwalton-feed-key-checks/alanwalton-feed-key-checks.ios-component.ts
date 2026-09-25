import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonFeedKeyChecks = {
  id: "01a0d965-d94e-71b0-8b7f-7373442b9763",
  type: "page-type/ios-component",
  slug: "alanwalton-feed-key-checks",
  definition: "what holds Alan's tiles to every key of the bodies they are handed",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key a feed sends is checked by decoding a body carrying that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A harness is handed the name and whether the check held and the reading the check saw.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This component is compiled by Alan's decode harness rather than by the app.",
    },
  ],
} as const satisfies IosComponent
