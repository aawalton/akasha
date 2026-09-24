import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassStrangers = {
  id: "01a0b4c8-61ba-7d27-b560-2c8c485efe99",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-strangers",
  ownLength: 3.838433333333333,
  ownProgress: 3.838433333333333,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Strangers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "strangers|7FQRbf8gbKw8KZQZAJWxH2|230306",
  song: "song/paul-cardall-strangers",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 12,
      externalId: "0mUsPfMgrnkGyiPRU0NCvI",
      externalLink: "https://open.spotify.com/track/0mUsPfMgrnkGyiPRU0NCvI",
    },
  ],
} as const satisfies Track
