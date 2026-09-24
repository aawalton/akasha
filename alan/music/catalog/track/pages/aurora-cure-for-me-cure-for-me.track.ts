import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraCureForMeCureForMe = {
  id: "01a0b638-022d-7caf-9d8a-34ce2227bd52",
  type: "page-type/track",
  slug: "aurora-cure-for-me-cure-for-me",
  ownLength: 3.3606666666666665,
  ownProgress: 3.3606666666666665,
  partOfCollections: ["release/aurora-cure-for-me", "release/aurora-the-gods-we-can-touch"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cure For Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "cureforme|1WgXqy2Dd70QQOU7Ay074N|201640",
  song: "song/aurora-cure-for-me",
  carriedBy: [
    {
      release: "release/aurora-cure-for-me",
      discNumber: 1,
      position: 1,
      externalId: "5suiloWwRiQdhFeb9YSGQT",
      externalLink: "https://open.spotify.com/track/5suiloWwRiQdhFeb9YSGQT",
    },
    {
      release: "release/aurora-the-gods-we-can-touch",
      discNumber: 1,
      position: 4,
      externalId: "33WTgxRdPBQQpVCMXpNxhO",
      externalLink: "https://open.spotify.com/track/33WTgxRdPBQQpVCMXpNxhO",
    },
  ],
} as const satisfies Track
