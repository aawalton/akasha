import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const codeEditorWindow = {
  id: "01a06826-92e5-77ad-ad85-f1aa8cb5d359",
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
  parts: ["instant-property/observed-at", "text-property/window-features"],
  properties: [
    {
      pageProperty: "instant-property/observed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/window-features",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
} as const satisfies PageType
