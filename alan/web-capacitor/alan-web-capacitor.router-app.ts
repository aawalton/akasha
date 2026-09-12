import type { RouterApp } from "akasha/code/router-apps/router-app.page-type.types.ts"

export const alanWebCapacitor = {
  id: "01a06582-324d-7c85-97b1-23c659bd7d23",
  type: "router-app",
  slug: "alan-web-capacitor",
  definition: "the routes Alan's site serves inside the shell on his phone",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  compileConfig: "json",
  viteConfig: "ts",
  routeTypesDirectory: true,
  declarationDirectory: true,
  bundleDirectory: true,
  parts: [
    "app-routes/alan-web-capacitor-routes",
    "module/not-found-notice",
    "stylesheet/alan-web-capacitor-look",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every route here is drawn in the browser rather than on a server.",
    },
    {
      invariantKind: "departure",
      statement: "The view a route here draws comes from the folder beside this router app.",
    },
    {
      invariantKind: "absence",
      statement: "No route here answers an api address.",
    },
    {
      invariantKind: "gap",
      statement: "A module reaching a node builtin fails the client build rather than the phone.",
    },
    {
      invariantKind: "constraint",
      statement: "The server entry here runs once at build time rather than on a request.",
    },
    {
      invariantKind: "departure",
      statement:
        "What parts this build from alan/web's is the folder each build runs in and that folder's config.",
    },
  ],
} as const satisfies RouterApp
