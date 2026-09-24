import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesSantaBaby = {
  id: "01a0a6c5-3e73-7c7f-9103-92693f05a995",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-santa-baby",
  ownLength: 2.848883333333333,
  ownProgress: 2.848883333333333,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  status: "completed",
  unit: "unit/minutes",
  title: "Santa Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Liz Gillies" }],
  trackKey: "santababy|66CXWjxzNUsdJxJ2JdwvnR,7pLntWGInZPQxc4kXxzzjB|170933",
  song: "song/taylor-swift-santa-baby",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-kisses",
      discNumber: 1,
      position: 4,
      externalId: "6YJdPrH3i2POzu7hdHIRrb",
      externalLink: "https://open.spotify.com/track/6YJdPrH3i2POzu7hdHIRrb",
    },
  ],
} as const satisfies Track
