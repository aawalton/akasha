import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonClaudeUsageChecks = {
  id: "01a0d96b-a8e0-736c-8c83-fe5e9491b771",
  type: "page-type/ios-component",
  slug: "alanwalton-claude-usage-checks",
  definition: "what holds Alan's Claude usage tile to the bodies the Claude usage feed sends",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The countdown words checked are the ones the Claude usage readouts' pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words other than those are checked too, so no word held here passes as stated.",
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
