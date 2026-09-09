import type { PageType } from "@akasha/pages/page-type"

export const codeEditorWindow = {
  id: "01a06826-92e5-77ad-ad85-f1aa8cb5d359",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "code-editor-window",
  definition: "one open window of the editor",
  pluralSlug: "code-editor-windows",
  extends: ["page-type/page"],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A closed window's page and its groups' and tabs' pages go in the hourly sweep rather than at once.",
    },
  ],
  types: "ts",
} as const satisfies PageType
