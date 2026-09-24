import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheChristmasBox = {
  id: "01a0b4c8-659f-78bf-9949-706f342e7d33",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-christmas-box",
  ownLength: 1.7888833333333334,
  ownProgress: 1.7888833333333334,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Christmas Box",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thechristmasbox|7FQRbf8gbKw8KZQZAJWxH2|107333",
  song: "song/paul-cardall-the-christmas-box",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 8,
      externalId: "4jZZ8mDC9dgj1z8vBQNovC",
      externalLink: "https://open.spotify.com/track/4jZZ8mDC9dgj1z8vBQNovC",
    },
  ],
} as const satisfies Track
