import type { IosProgram } from "../../ios-program.page-type.ts"

export const alanwaltonApp = {
  id: "01a05907-081b-7809-90b1-4d000b138209",
  pageTypeSlug: "ios-program",
  slug: "alanwalton-app",
  definition: "the web view Alan's phone opens",
  entitlements: "entitlements",
  profileName: "alanwalton app App Store",
} as const satisfies IosProgram
