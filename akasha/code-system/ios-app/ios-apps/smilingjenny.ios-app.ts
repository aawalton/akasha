import type { IosApp } from "../ios-app.page-type.ts"

export const smilingjenny = {
  id: "01a05821-5723-7a0b-86e8-e855fe49385b",
  pageTypeSlug: "ios-app",
  slug: "smilingjenny",
  definition: "the app on Jenny's phone and the shell it runs in",
  componentSlugs: [
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/spacing",
    "ios-component/surplus-ring",
    "ios-component/tier",
  ],
} as const satisfies IosApp
