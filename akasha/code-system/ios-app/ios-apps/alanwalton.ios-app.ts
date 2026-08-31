import type { IosApp } from "../ios-app.page-type.ts"

export const alanwalton = {
  id: "01a05821-5723-7172-b3f3-b3708871f3fc",
  pageTypeSlug: "ios-app",
  slug: "alanwalton",
  definition: "the app on Alan's phone and the shell it runs in",
  componentSlugs: [
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/spacing",
    "ios-component/surplus-ring",
    "ios-component/tier",
  ],
} as const satisfies IosApp
