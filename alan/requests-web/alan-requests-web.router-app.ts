import type { RouterApp } from "akasha/code/router-app/router-app.page-type.types.ts"

export const alanRequestsWeb = {
  id: "01a0c537-ba4f-70c8-8138-07fe3a3ea045",
  type: "page-type/router-app",
  slug: "alan-requests-web",
  definition: "the routes the Requests site serves to a browser",
  tunnelRoutes: [
    {
      name: "requests",
      hostname: "requests.alanwalton.com",
      service: "http://requests.alanwalton.svc.cluster.local:3000",
    },
  ],
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  compileConfig: "json",
  viteConfig: "ts",
  server: "ts",
  sidebarBoot: "js",
  gitIgnore: "gitignore",
  routeTypesDirectory: true,
  declarationDirectory: true,
  bundleDirectory: true,
  parts: [
    "app-routes/alan-requests-web-routes",
    "module/requests-app-id",
    "module/requests-app-shell",
    "module/requests-auth-provider",
    "module/requests-handover-site",
    "module/requests-nav-command",
    "module/requests-nav-items",
    "stylesheet/alan-requests-web-look",
    "manifest/alanwalton-requests",
  ],
  toolReached: ["react-dom"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This site is open to a reader who has not signed in, and its guard says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What such a reader reaches is every access `person/anonymous` holds and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Anonymous access is one holder across every site, so each narrow here is public everywhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type this site draws takes two accesses: one on the type, one narrowing `page-type` to it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A listing reads its page type first, so a type outside that narrow is refused whatever else is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Opening a feature request costs points, so it goes by a route of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other write here is refused to a reader who has not signed in.",
    },
  ],
} as const satisfies RouterApp
