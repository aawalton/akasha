import type { IosProgram } from "akasha/code/ios-program/ios-program.page-type.types.ts"

export const smilingjennyApp = {
  id: "01a05907-081c-74fb-ab6e-e4bce2d526ee",
  type: "page-type/ios-program",
  slug: "smilingjenny-app",
  definition: "the web view Jenny's phone opens",
  entitlements: "entitlements",
} as const satisfies IosProgram
