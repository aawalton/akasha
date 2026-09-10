import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const alanwaltonClaudeUsageWidget = {
  id: "01a05835-69da-7412-b864-9a97dd228bc6",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "alanwalton-claude-usage-widget",
  definition: "Alan's tile for Claude account usage",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file has the bundle Alan's widget extension starts at.",
    },
  ],
} as const satisfies IosComponent
