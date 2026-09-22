import type { RouterApp } from "akasha/code/router-app/router-app.page-type.types.ts"

export const wanderingInnWikiWeb = {
  id: "01a0c5eb-fefb-782b-b6d3-6a775c512d24",
  type: "page-type/router-app",
  slug: "wandering-inn-wiki-web",
  definition: "the routes innworld.wiki serves to a browser",
  tunnelRoutes: "ts",
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
    "app-routes/wandering-inn-wiki-web-routes",
    "manifest/wandering-inn-wiki-web-manifests",
    "module/innworld-app-shell",
    "module/innworld-reader",
    "module/innworld-reading",
    "module/innworld-visitor",
    "stylesheet/wandering-inn-wiki-web-look",
  ],
  toolReached: ["react-dom"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This site serves the pages of one world and no other page akasha holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which world that is is settled by the grants its reader holds rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page this site serves credits the author of the work the wiki is about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page is served under the type that page is rather than the type that type extends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types this site reaches are served too, since its components read them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is drawn by the components every other site of Alan's draws a page with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This site is not editing, so nothing it draws offers a way to write a page.",
    },
  ],
} as const satisfies RouterApp
