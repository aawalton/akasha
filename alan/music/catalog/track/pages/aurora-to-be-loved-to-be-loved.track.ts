import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedToBeLoved = {
  id: "01a0b638-0e48-7058-919c-1854d51c15c4",
  type: "page-type/track",
  slug: "aurora-to-be-loved-to-be-loved",
  ownLength: 3.8099,
  ownProgress: 3.8099,
  partOfCollections: ["release/aurora-to-be-loved"],
  status: "completed",
  unit: "unit/minutes",
  title: "To Be Loved",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Askjell" }, { artist: "artist/aurora" }],
  trackKey: "tobeloved|1WgXqy2Dd70QQOU7Ay074N,3NABmtfO8G8s96WFGhbR7F|228594",
  song: "song/aurora-to-be-loved",
  carriedBy: [
    {
      release: "release/aurora-to-be-loved",
      discNumber: 1,
      position: 3,
      externalId: "1YSvsbCHSwyGKX7wNtV4ld",
      externalLink: "https://open.spotify.com/track/1YSvsbCHSwyGKX7wNtV4ld",
    },
  ],
} as const satisfies Track
