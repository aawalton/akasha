import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidOneGoodThingOneGoodThing = {
  id: "01a0c95e-aa84-7119-863d-4008e17bdd73",
  type: "page-type/track",
  slug: "lyn-lapid-one-good-thing-one-good-thing",
  ownLength: 3.2678166666666666,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-one-good-thing"],
  status: "not-started",
  unit: "unit/minutes",
  title: "one good thing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "onegoodthing|4pfy05cNNTacuOQ6SiSu4v|196069",
  song: "song/lyn-lapid-one-good-thing",
  carriedBy: [
    {
      release: "release/lyn-lapid-one-good-thing",
      discNumber: 1,
      position: 1,
      externalId: "35YsfwRJ3rC5atc0RZE8HV",
      externalLink: "https://open.spotify.com/track/35YsfwRJ3rC5atc0RZE8HV",
    },
  ],
} as const satisfies Track
