import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const audhdalanNoSuchPage = {
  id: "01a0e383-ebe0-7bef-aba9-7db2f275863a",
  type: "page-type/route",
  slug: "audhdalan-no-such-page",
  definition: "that no page of audhdalan.com is at the address a reader named",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every address no other route answers is answered not found by the root's screen.",
    },
  ],
} as const satisfies Route
