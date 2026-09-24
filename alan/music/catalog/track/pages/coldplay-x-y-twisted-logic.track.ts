import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTwistedLogic = {
  id: "01a0b9ee-e57e-7acf-bd06-44e35056a024",
  type: "page-type/track",
  slug: "coldplay-x-y-twisted-logic",
  ownLength: 4.531,
  ownProgress: 4.531,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Twisted Logic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "twistedlogic|4gzpq5DPGxSnKTe4SA8HAU|271860",
  song: "song/coldplay-twisted-logic",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 12,
      externalId: "6kevl5fnM7GRJ2K2rBBnxq",
      externalLink: "https://open.spotify.com/track/6kevl5fnM7GRJ2K2rBBnxq",
    },
  ],
} as const satisfies Track
