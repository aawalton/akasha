import type { IosProgram } from "../../ios-program.page-type.ts"

export const smilingjennyDecodeHarness = {
  id: "01a0590a-0b38-7a31-a332-3212460d77ba",
  pageTypeSlug: "ios-program",
  slug: "smilingjenny-decode-harness",
  definition: "proof that every tile decodes the payload it is handed",
  main: "swift",
  componentSlugs: [
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/smilingjenny-categorize-view",
    "ios-component/smilingjenny-safety-level-widget",
    "ios-component/smilingjenny-surplus-widget",
    "ios-component/smilingjenny-widget-feed",
    "ios-component/spacing",
    "ios-component/surplus-ring",
    "ios-component/tier",
  ],
} as const satisfies IosProgram
