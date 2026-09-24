import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedHalfEmptyButHappy = {
  id: "01a0b638-0e6f-7fc7-b3e4-fc8ad7f6a4b9",
  type: "page-type/track",
  slug: "aurora-to-be-loved-half-empty-but-happy",
  ownLength: 4.060033333333333,
  ownProgress: 4.060033333333333,
  partOfCollections: ["release/aurora-to-be-loved"],
  status: "completed",
  unit: "unit/minutes",
  title: "Half Empty But Happy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Askjell" }],
  trackKey: "halfemptybuthappy|3NABmtfO8G8s96WFGhbR7F|243602",
  song: "song/aurora-half-empty-but-happy",
  carriedBy: [
    {
      release: "release/aurora-to-be-loved",
      discNumber: 1,
      position: 4,
      externalId: "67wNjh1nTci8GuATIhJWut",
      externalLink: "https://open.spotify.com/track/67wNjh1nTci8GuATIhJWut",
    },
  ],
} as const satisfies Track
