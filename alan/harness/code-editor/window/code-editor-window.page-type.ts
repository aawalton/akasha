import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeEditorWindow = {
  id: "01a06826-92e5-77ad-ad85-f1aa8cb5d359",
  type: "page-type",
  slug: "code-editor-window",
  definition: "one open window of the editor",
  extends: ["page-type/page"],
  mortal: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window's page is made by the first write of that window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A closed window's page goes in the hourly sweep rather than at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window's page goes by its slug naming a process that is gone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page is written for a window's groups or for a window's tabs.",
    },
  ],
  types: "ts",
  parts: [
    "instant-property/observed-at",
    "module/window-page-sweeping",
    "service-workstation/sweep-window-pages",
    "text-property/window-features",
  ],
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
  schema: "jsonl",
} as const satisfies PageType
