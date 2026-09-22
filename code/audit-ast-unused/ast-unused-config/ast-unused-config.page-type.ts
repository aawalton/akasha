import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const astUnusedConfig = {
  id: "01a08198-1060-7b7c-b4d4-b7d8ba41baf1",
  type: "page-type/page-type",
  slug: "ast-unused-config",
  definition: "a file of the curation holding the ast-unused audit's globs",
  parts: ["file-property/curation"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "file-property/curation", required: false, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The root keeps the name its reader has compiled in rather than taking a page's.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
