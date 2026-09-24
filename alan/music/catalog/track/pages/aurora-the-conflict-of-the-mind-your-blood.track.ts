import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheConflictOfTheMindYourBlood = {
  id: "01a0b638-016a-7825-a78e-75498765de7a",
  type: "page-type/track",
  slug: "aurora-the-conflict-of-the-mind-your-blood",
  ownLength: 4.137766666666667,
  ownProgress: 4.137766666666667,
  partOfCollections: ["release/aurora-the-conflict-of-the-mind", "release/aurora-your-blood"],
  status: "completed",
  unit: "unit/minutes",
  title: "Your Blood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "yourblood|1WgXqy2Dd70QQOU7Ay074N|248266",
  song: "song/aurora-your-blood",
  carriedBy: [
    {
      release: "release/aurora-the-conflict-of-the-mind",
      discNumber: 1,
      position: 2,
      externalId: "1kiLhVtNkuBgsbOBtaXzaL",
      externalLink: "https://open.spotify.com/track/1kiLhVtNkuBgsbOBtaXzaL",
    },
    {
      release: "release/aurora-your-blood",
      discNumber: 1,
      position: 1,
      externalId: "4QJKtN5EXFtxbqnHuibwEL",
      externalLink: "https://open.spotify.com/track/4QJKtN5EXFtxbqnHuibwEL",
    },
  ],
} as const satisfies Track
