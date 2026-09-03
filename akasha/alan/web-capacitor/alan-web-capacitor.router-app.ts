import type { RouterApp } from "../../code-system/router-apps/router-app.page-type.ts"

export const alanWebCapacitor = {
  id: "01a06582-324d-7c85-97b1-23c659bd7d23",
  pageTypeSlug: "router-app",
  slug: "alan-web-capacitor",
  definition: "the routes Alan's site serves inside the shell on his phone",
  manifest: "json",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  partSlugs: ["stylesheet/alan-web-capacitor-look"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every route here is drawn in the browser rather than on a server.",
    },
    {
      invariantKind: "departure",
      statement: "What a route here draws comes from the package beside it through its manifest.",
    },
    {
      invariantKind: "absence",
      statement: "No route here answers an api address.",
    },
    {
      invariantKind: "gap",
      statement: "A module reaching a node builtin fails the client build rather than the phone.",
    },
  ],
} as const satisfies RouterApp
