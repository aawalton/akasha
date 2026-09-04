import type { IosProgram } from "../../ios-program.page-type.ts"

export const smilingjennyWidget = {
  id: "01a05907-081c-72e1-bd1f-67e6df79007e",
  pageTypeSlug: "ios-program",
  slug: "smilingjenny-widget",
  definition: "the tiles on Jenny's home screen",
  bundleId: "me.smilingjenny.app.widgets",
  infoPlist: "plist",
  componentSlugs: [
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/smilingjenny-categorize-view",
    "ios-component/smilingjenny-categorize-widget",
    "ios-component/smilingjenny-safety-level-widget",
    "ios-component/smilingjenny-surplus-widget",
    "ios-component/smilingjenny-widget-feed",
    "ios-component/spacing",
    "ios-component/surplus-ring",
    "ios-component/tier",
  ],
  targetName: "SmilingJennyWidgetExtension",
  profileName: "smilingjenny widget App Store",
} as const satisfies IosProgram
