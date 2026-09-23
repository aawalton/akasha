import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordNeathTheGroveIsAHeart = {
  id: "01a0ce87-113a-71df-b544-dcaf64be53cd",
  type: "page-type/track",
  slug: "yaelokre-foreword-neath-the-grove-is-a-heart",
  ownLength: 3.922,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Neath the grove is a heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" },
    { externalId: "5nS4Ohh7IG844fp1Eu1GMI", artistName: "Keath Ósk" },
  ],
  trackKey: "neaththegroveisaheart|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|235320",
  song: "song/yaelokre-neath-the-grove-is-a-heart",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 4,
      externalId: "1fXGKI8iX05qgeG8wXvehU",
      externalLink: "https://open.spotify.com/track/1fXGKI8iX05qgeG8wXvehU",
    },
  ],
} as const satisfies Track
