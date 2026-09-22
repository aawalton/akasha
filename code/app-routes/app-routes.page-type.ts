import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const appRoutes = {
  id: "01a08bde-996d-7a1b-9c3e-1dba85f9060d",
  type: "page-type/page-type",
  slug: "app-routes",
  definition: "the routes a router app serves",
  parts: ["code-file-property/app-layout"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "code-file-property/app-layout", required: false, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app's routes are declared here rather than on the router app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page here is slugged the router app's slug followed by `routes`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app names the page here as a part rather than naming each route.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
