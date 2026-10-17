import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const sayItOnce = {
  id: "01a14b1a-2289-7226-8e2a-2e3b3c7efc26",
  type: "page-type/style-rule",
  slug: "say-it-once",
  name: "Say It Once",
  act: "Say each thing once.",
  warrant:
    "A line said twice shows the writer did not trust it to land, and the reader feels that.",
  aids: [
    "Cut any sentence that only repeats or underlines the one before.",
    "A short line after a long one is not stronger for saying it again.",
  ],
  createdAt: "2026-10-17T18:22:46.408Z",
  updatedAt: "2026-10-17T18:22:46.408Z",
} as const satisfies StyleRule
