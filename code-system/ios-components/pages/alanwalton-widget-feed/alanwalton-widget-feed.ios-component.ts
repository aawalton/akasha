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
    {
      invariantKind: "departure",
      statement: "A cached reading carries the moment the cached reading was written.",
    },
    {
      invariantKind: "departure",
      statement: "A cached reading is let go once it is older than the age the route refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A reading let go is drawn as no reading rather than as a number.",
    },
  ],
} as const satisfies IosComponent
