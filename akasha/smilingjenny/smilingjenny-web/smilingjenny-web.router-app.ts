import type { RouterApp } from "../../code-system/router-apps/router-app.page-type.ts"

export const smilingjennyWeb = {
  id: "01a06558-c2cc-700f-95e8-f8ba5ccafe1e",
  pageTypeSlug: "router-app",
  slug: "smilingjenny-web",
  definition: "the routes Jenny's site serves to a browser",
  manifest: "json",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  partSlugs: [
    "stylesheet/smilingjenny-web-look",
    "module/jenny-capacitor-bridge",
    "module/jenny-push-registration-sync",
    "module/jenny-ring-credential",
    "module/jenny-session",
    "module/jenny-shell",
  ],
} as const satisfies RouterApp
