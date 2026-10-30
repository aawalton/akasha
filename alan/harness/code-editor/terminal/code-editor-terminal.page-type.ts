import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeEditorTerminal = {
  id: "01a06826-92e5-7481-a7d4-68af91528f0b",
  type: "page-type/page-type",
  slug: "code-editor-terminal",
  definition: "a terminal the code editor runs",
  extends: ["page-type/page"],
  mortal: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal moves only where Alan's own layout moves that terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A closed terminal's page goes in the hourly sweep rather than as the terminal closes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:42:33.573Z",
  updatedAt: "2026-10-30T15:36:49.236Z",
} as const satisfies PageType
