import type { PageType } from "@akasha/pages/page-type"

export const modulePropertyGroup = {
  id: "01a087b6-ed4d-74ed-b30f-7c9dd49d73c0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "module-property-group",
  definition: "a file property group held in a module's code, test and test fixtures",
  pluralSlug: "module-property-groups",
  extends: ["page-type/file-property-group"],
  properties: [
    { pageProperty: "code-file-property/code", required: true, many: false, fixed: "ts" },
    { pageProperty: "code-file-property/test", required: true, many: false, fixed: "ts" },
    {
      pageProperty: "code-file-property/test-fixtures",
      required: false,
      many: false,
      fixed: "ts",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page carrying one of these has code and a test under that group's slug.",
    },
    {
      invariantKind: "departure",
      statement: "What sets that test up is a third file the page may have.",
    },
    {
      invariantKind: "departure",
      statement: "A group of this page type states no members, having these three.",
    },
    {
      invariantKind: "departure",
      statement: "The three files are TypeScript, and no page carrying the group says otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying the group states nothing about these files at all.",
    },
  ],
  types: "ts",
} as const satisfies PageType
