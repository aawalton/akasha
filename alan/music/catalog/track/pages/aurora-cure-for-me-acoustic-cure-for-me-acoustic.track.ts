import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraCureForMeAcousticCureForMeAcoustic = {
  id: "01a0b638-04d9-71ec-84a1-441220b47507",
  type: "page-type/track",
  slug: "aurora-cure-for-me-acoustic-cure-for-me-acoustic",
  ownLength: 3.556216666666667,
  ownProgress: 3.556216666666667,
  partOfCollections: ["release/aurora-cure-for-me-acoustic", "release/aurora-cure-for-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cure for Me - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "cureformeacoustic|1WgXqy2Dd70QQOU7Ay074N|213373",
  song: "song/aurora-cure-for-me",
  carriedBy: [
    {
      release: "release/aurora-cure-for-me",
      discNumber: 1,
      position: 2,
      externalId: "2tkCvlBzMD6XXQbacxNB1v",
      externalLink: "https://open.spotify.com/track/2tkCvlBzMD6XXQbacxNB1v",
    },
    {
      release: "release/aurora-cure-for-me-acoustic",
      discNumber: 1,
      position: 1,
      externalId: "3Kg0X8buY9Exe3EM3db8Lx",
      externalLink: "https://open.spotify.com/track/3Kg0X8buY9Exe3EM3db8Lx",
    },
  ],
} as const satisfies Track
