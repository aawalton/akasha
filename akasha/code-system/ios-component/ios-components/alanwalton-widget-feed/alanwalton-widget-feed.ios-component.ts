import type { IosComponent } from "../../ios-component.page-type.ts"

export const alanwaltonWidgetFeed = {
  id: "01a05835-69d7-777a-9161-494558086ce9",
  pageTypeSlug: "ios-component",
  slug: "alanwalton-widget-feed",
  definition: "the fetch every tile of Alan's app draws from",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The credential is read from the keychain as the tile is drawn.",
    },
  ],
} as const satisfies IosComponent
