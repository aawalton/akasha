import type { IosComponent } from "../../ios-component.page-type.ts"

export const smilingjennyWidgetFeed = {
  id: "01a05835-69dc-778f-bb4b-dd897c3cb3e7",
  pageTypeSlug: "ios-component",
  slug: "smilingjenny-widget-feed",
  definition: "the fetch every tile of Jenny's app draws from",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The credential is baked into the build rather than read as the tile is drawn.",
    },
  ],
} as const satisfies IosComponent
