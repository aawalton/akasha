import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const nodeProfile = {
  id: "01a06584-9bf3-7005-8c8a-3efa6e4e94b2",
  pageTypeSlug: "module",
  slug: "node-profile",
  definition: "a node's front matter and the headings beneath it, rendered and read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every field a node carries is stated in the front matter above its headings.",
    },
    {
      invariantKind: "departure",
      statement: "A status says whether a node is live or resting or unopened.",
    },
    {
      invariantKind: "departure",
      statement: "A field the front matter does not carry is refused rather than filled in.",
    },
    {
      invariantKind: "departure",
      statement: "A chevron parts each name in a label from the next.",
    },
    {
      invariantKind: "departure",
      statement: "A title is the last name in a label.",
    },
    {
      invariantKind: "stopgap",
      statement: "A profile is markdown with front matter rather than a page.",
    },
  ],
} as const satisfies Module
