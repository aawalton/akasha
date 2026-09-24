import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAwakeningAwakening = {
  id: "01a0b638-127e-7870-a843-aaedb3d90e02",
  type: "page-type/track",
  slug: "aurora-awakening-awakening",
  ownLength: 3.6830166666666666,
  ownProgress: 3.6830166666666666,
  partOfCollections: ["release/aurora-awakening"],
  status: "completed",
  unit: "unit/minutes",
  title: "Awakening",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "awakening|1WgXqy2Dd70QQOU7Ay074N|220981",
  song: "song/aurora-awakening",
  carriedBy: [
    {
      release: "release/aurora-awakening",
      discNumber: 1,
      position: 1,
      externalId: "4U5WvRz4XVuP5vBpZysJCU",
      externalLink: "https://open.spotify.com/track/4U5WvRz4XVuP5vBpZysJCU",
    },
  ],
} as const satisfies Track
