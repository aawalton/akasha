import type { IosProgram } from "../../ios-program.page-type.ts"

export const smilingjennyApp = {
  id: "01a05907-081c-74fb-ab6e-e4bce2d526ee",
  pageTypeSlug: "ios-program",
  slug: "smilingjenny-app",
  definition: "the web view Jenny's phone opens",
  entitlements: "entitlements",
  profileName: "smilingjenny app App Store",
} as const satisfies IosProgram
