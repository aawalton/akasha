import type { IosApp } from "../../ios-app.page-type.ts"

export const smilingjenny = {
  id: "01a05821-5723-7a0b-86e8-e855fe49385b",
  pageTypeSlug: "ios-app",
  slug: "smilingjenny",
  definition: "the app on Jenny's phone and the shell it runs in",
  manifest: "json",
  capacitorConfig: "json",
  gitIgnore: "gitignore",
  partSlugs: [
    "ios-program/smilingjenny-app",
    "ios-program/smilingjenny-decode-harness",
    "ios-program/smilingjenny-widget",
  ],
} as const satisfies IosApp
