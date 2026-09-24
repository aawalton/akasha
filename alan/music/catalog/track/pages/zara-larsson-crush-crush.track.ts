import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonCrushCrush = {
  id: "01a0aa7c-36ba-781d-b4f9-109d6a94c57a",
  type: "page-type/track",
  slug: "zara-larsson-crush-crush",
  ownLength: 2.951966666666667,
  ownProgress: 2.951966666666667,
  partOfCollections: [
    "release/zara-larsson-crush",
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Crush",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "crush|1Xylc3o4UrD53lo9CvFvVg|177118",
  song: "song/zara-larsson-crush",
  carriedBy: [
    {
      release: "release/zara-larsson-crush",
      discNumber: 1,
      position: 1,
      externalId: "79bteG47Ms3rUa9TTxhTzF",
      externalLink: "https://open.spotify.com/track/79bteG47Ms3rUa9TTxhTzF",
    },
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 5,
      externalId: "5qE28swK9ufll68IzqG1aY",
      externalLink: "https://open.spotify.com/track/5qE28swK9ufll68IzqG1aY",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 5,
      externalId: "4ihKIMqWNKoAvDm0Yfn8un",
      externalLink: "https://open.spotify.com/track/4ihKIMqWNKoAvDm0Yfn8un",
    },
  ],
} as const satisfies Track
