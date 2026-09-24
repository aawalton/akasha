import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonEurosummerGirlsTripEurosummerGirlsTrip = {
  id: "01a0aa7c-23b8-7297-8b5a-61f49e2278cb",
  type: "page-type/track",
  slug: "zara-larsson-eurosummer-girls-trip-eurosummer-girls-trip",
  ownLength: 2.8391,
  ownProgress: 0,
  partOfCollections: [
    "release/zara-larsson-eurosummer-girls-trip",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Eurosummer - Girls Trip",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Shakira" }],
  trackKey: "eurosummergirlstrip|0EmeFodog0BfCgMzAIvKQp,1Xylc3o4UrD53lo9CvFvVg|170346",
  song: "song/zara-larsson-eurosummer-girls-trip",
  carriedBy: [
    {
      release: "release/zara-larsson-eurosummer-girls-trip",
      discNumber: 1,
      position: 1,
      externalId: "5tmEfi2Es0G7B3pVRESEnw",
      externalLink: "https://open.spotify.com/track/5tmEfi2Es0G7B3pVRESEnw",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 1,
      position: 6,
      externalId: "53fyIvbeN7rfLK1GIZNLDL",
      externalLink: "https://open.spotify.com/track/53fyIvbeN7rfLK1GIZNLDL",
    },
  ],
} as const satisfies Track
