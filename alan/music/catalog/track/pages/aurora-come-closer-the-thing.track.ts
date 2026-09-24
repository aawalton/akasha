import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserTheThing = {
  id: "01a0b637-e8a2-7b91-914c-a382f781694a",
  type: "page-type/track",
  slug: "aurora-come-closer-the-thing",
  grade: "C",
  ownLength: 5.6353333333333335,
  ownProgress: 5.6353333333333335,
  partOfCollections: ["release/aurora-come-closer", "release/aurora-the-thing"],
  status: "completed",
  unit: "unit/minutes",
  title: "THE THING",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "TOMORA" },
    { artist: "artist/aurora" },
    { artistName: "Tom Rowlands" },
  ],
  trackKey: "thething|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|338120",
  song: "song/aurora-the-thing",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 11,
      externalId: "73TBGeURpzzUGTghL8UyvP",
      externalLink: "https://open.spotify.com/track/73TBGeURpzzUGTghL8UyvP",
    },
    {
      release: "release/aurora-the-thing",
      discNumber: 1,
      position: 1,
      externalId: "43EE1xyVwIskJP13cJZJ6j",
      externalLink: "https://open.spotify.com/track/43EE1xyVwIskJP13cJZJ6j",
    },
  ],
} as const satisfies Track
