import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const dashboard = {
  id: "01a07c67-a724-7337-8adc-5a5e3a393057",
  type: "page-type/page-type",
  slug: "dashboard",
  definition: "what a chart server draws over one subject",
  parts: ["file-property/dashboard-layout"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "file-property/dashboard-layout", required: true, many: false }],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dashboard is one page and one layout file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dashboard is found by its page type rather than by its file name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A manifest inlines a dashboard rather than a chart server fetching that dashboard.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
