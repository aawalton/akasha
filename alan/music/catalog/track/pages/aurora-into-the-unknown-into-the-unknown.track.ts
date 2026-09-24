import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraIntoTheUnknownIntoTheUnknown = {
  id: "01a0b638-0d49-79e4-9e1d-9f8e5163939c",
  type: "page-type/track",
  slug: "aurora-into-the-unknown-into-the-unknown",
  ownLength: 3.332666666666667,
  ownProgress: 3.332666666666667,
  partOfCollections: ["release/aurora-into-the-unknown"],
  status: "completed",
  unit: "unit/minutes",
  title: "Into the Unknown",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "intotheunknown|1WgXqy2Dd70QQOU7Ay074N|199960",
  song: "song/aurora-into-the-unknown",
  carriedBy: [
    {
      release: "release/aurora-into-the-unknown",
      discNumber: 1,
      position: 1,
      externalId: "0O2szuaez7BKxS8SH7RkV4",
      externalLink: "https://open.spotify.com/track/0O2szuaez7BKxS8SH7RkV4",
    },
  ],
} as const satisfies Track
