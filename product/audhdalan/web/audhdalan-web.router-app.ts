import type { RouterApp } from "akasha/code/router-app/router-app.page-type.types.ts"

export const audhdalanWeb = {
  id: "01a06558-c2cc-7008-82aa-ce6fcd6a0c2a",
  type: "page-type/router-app",
  slug: "audhdalan-web",
  definition: "the routes audhdalan.com serves to a browser",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "audhdalan.com" }],
  tunnelRoutes: [
    {
      name: "audhdalan",
      hostname: "audhdalan.com",
      service: "http://web.audhdalan.svc.cluster.local:3000",
    },
  ],
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  compileConfig: "json",
  viteConfig: "ts",
  server: "ts",
  gitIgnore: "gitignore",
  routeTypesDirectory: true,
  declarationDirectory: true,
  bundleDirectory: true,
  parts: [
    "app-routes/audhdalan-web-routes",
    "module/deck-page-content",
    "module/resource-list",
    "module/subscribe-form",
    "stylesheet/audhdalan-web-look",
  ],
  toolReached: ["react-dom"],
  createdAt: "2026-09-03T03:38:30.988Z",
  updatedAt: "2026-10-30T16:45:01.332Z",
} as const satisfies RouterApp
