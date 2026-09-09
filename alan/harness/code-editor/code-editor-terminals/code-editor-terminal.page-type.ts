import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"

export type CodeEditorTerminal = Page

export const codeEditorTerminal = {
  id: "01a06826-92e5-7481-a7d4-68af91528f0b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "code-editor-terminal",
  definition: "a terminal the editor is running",
  pluralSlug: "code-editor-terminals",
  extends: ["page-type/page"],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A terminal moves only where Alan's own layout moves that terminal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A closed terminal's page goes in the hourly sweep rather than as the terminal closes.",
    },
  ],
} as const satisfies PageType
