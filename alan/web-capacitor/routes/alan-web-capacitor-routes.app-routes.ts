import type { AppRoutes } from "akasha/code-system/app-routes/app-routes.page-type.types.ts"

export const alanWebCapacitorRoutes = {
  id: "01a08be4-ad44-7cf7-a61e-f015e7fbae35",
  type: "app-routes",
  slug: "alan-web-capacitor-routes",
  definition: "the routes Alan's site serves inside the shell on his phone",
  appLayout: "tsx",
  parts: [
    "route/alan-web-capacitor-home",
    "route/alan-web-capacitor-page-detail",
    "route/alan-web-capacitor-page-listing",
    "route/alan-web-capacitor-sign-in",
  ],
} as const satisfies AppRoutes
