import type { IosProgram } from "../../ios-program.page-type.ts"

export const alanwaltonDecodeHarness = {
  id: "01a0590a-0b37-799f-8e3f-cb30189db988",
  pageTypeSlug: "ios-program",
  slug: "alanwalton-decode-harness",
  definition: "proof that every tile decodes the payload it is handed",
  main: "swift",
  componentSlugs: [
    "ios-component/alanwalton-categorize-widget",
    "ios-component/alanwalton-claude-usage-payload",
    "ios-component/alanwalton-claude-usage-view",
    "ios-component/alanwalton-device-secret-reader",
    "ios-component/alanwalton-inbox-stoplights-widget",
    "ios-component/alanwalton-never-loaded-view",
    "ios-component/alanwalton-refused-view",
    "ios-component/alanwalton-safety-level-widget",
    "ios-component/alanwalton-stoplight-ring",
    "ios-component/alanwalton-surplus-widget",
    "ios-component/alanwalton-upkeep-stoplights-widget",
    "ios-component/alanwalton-widget-feed",
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/spacing",
    "ios-component/surplus-ring",
    "ios-component/tier",
  ],
} as const satisfies IosProgram
