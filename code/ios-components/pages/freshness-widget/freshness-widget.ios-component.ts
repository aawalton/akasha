import type { IosComponent } from "akasha/code/ios-components/ios-component.page-type.types.ts"

export const freshnessWidget = {
  id: "01a09afa-9290-7746-8486-4ef295a76c76",
  type: "ios-component",
  slug: "freshness-widget",
  definition: "the tile saying how old the oldest reading the other tiles hold is",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both apps compile this one tile rather than each carrying a copy of it.",
    },
    {
      invariantKind: "departure",
      statement: "The age drawn is the oldest reading any tile of the app holds.",
    },
    {
      invariantKind: "departure",
      statement: "A feed counts while a tile placed on the phone asks for it.",
    },
    {
      invariantKind: "departure",
      statement: "Which tiles are placed is read off WidgetKit rather than worked out from use.",
    },
    {
      invariantKind: "departure",
      statement: "A feed no placed tile asks for is left out of the age, the count and the band.",
    },
    {
      invariantKind: "departure",
      statement: "A tile is set beside its feed through the pairing its own provider wrote.",
    },
    {
      invariantKind: "constraint",
      statement: "A tile gone from the phone is asked for a picture, and that picture is fetched.",
    },
    {
      invariantKind: "departure",
      statement: "The tile names the feed that oldest reading came from.",
    },
    {
      invariantKind: "departure",
      statement: "A feed is named by the last part of its path.",
    },
    {
      invariantKind: "departure",
      statement: "A reading's moment is written only where that reading decoded.",
    },
    {
      invariantKind: "departure",
      statement: "An age still climbing is a refresh that did not land.",
    },
    {
      invariantKind: "departure",
      statement: "The age counts up while nothing of the tile's is running.",
    },
    {
      invariantKind: "departure",
      statement: "The whole tile is the button asking every tile of the app to reload.",
    },
    {
      invariantKind: "departure",
      statement: "Every reload a tile is granted is noted where this tile can count it.",
    },
    {
      invariantKind: "departure",
      statement: "The tile draws the day's reload count and the band from the fewest to the most.",
    },
    {
      invariantKind: "constraint",
      statement: "The notes kept are the last two hundred and forty rather than every one.",
    },
    {
      invariantKind: "absence",
      statement: "This tile fetches nothing and says nothing about what a reading is.",
    },
  ],
} as const satisfies IosComponent
