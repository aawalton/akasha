import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedRequiem = {
  id: "01a0b638-0e94-74b4-8681-6d7c326f3963",
  type: "page-type/track",
  slug: "aurora-to-be-loved-requiem",
  ownLength: 6.468183333333333,
  ownProgress: 6.468183333333333,
  partOfCollections: ["release/aurora-to-be-loved"],
  status: "completed",
  unit: "unit/minutes",
  title: "Requiem",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Askjell" }],
  trackKey: "requiem|3NABmtfO8G8s96WFGhbR7F|388091",
  song: "song/aurora-requiem",
  carriedBy: [
    {
      release: "release/aurora-to-be-loved",
      discNumber: 1,
      position: 5,
      externalId: "4JT0A22SYMNP1ceiVrCxIc",
      externalLink: "https://open.spotify.com/track/4JT0A22SYMNP1ceiVrCxIc",
    },
  ],
} as const satisfies Track
