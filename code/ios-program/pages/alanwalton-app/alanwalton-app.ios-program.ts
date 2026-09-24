import type { IosProgram } from "akasha/code/ios-program/ios-program.page-type.types.ts"

export const alanwaltonApp = {
  id: "01a05907-081b-7809-90b1-4d000b138209",
  type: "page-type/ios-program",
  slug: "alanwalton-app",
  definition: "the web view Alan's phone opens",
  entitlements: "entitlements",
} as const satisfies IosProgram
