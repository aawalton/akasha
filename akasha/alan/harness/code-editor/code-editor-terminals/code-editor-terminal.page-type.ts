import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CodeEditorTerminal = Page

export const codeEditorTerminal = {
  id: "01a06826-92e5-7481-a7d4-68af91528f0b",
  pageTypeSlug: "page-type",
  slug: "code-editor-terminal",
  definition: "a terminal the editor is running",
  pluralSlug: "code-editor-terminals",
  extendsSlug: "page-type/page",
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A terminal moves only where Alan's own layout moves it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A closed terminal's page goes in the hourly sweep rather than as the terminal closes.",
    },
  ],
} as const satisfies PageType
