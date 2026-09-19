import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSofiaSofia = {
  id: "01a0b638-0501-7e86-848b-214b0a17913a",
  type: "page-type/track",
  slug: "aurora-sofia-sofia",
  ownLength: 7.288616666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-sofia"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZKgNecNAfYBhkti1IxwSw",
      externalLink: "https://open.spotify.com/track/6ZKgNecNAfYBhkti1IxwSw",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sofia",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" },
    { externalId: "5jOiYJPp5e84cnK2KO1aNz", artistName: "Iris Caltwait" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
  ],
  trackKey: "sofia|1WgXqy2Dd70QQOU7Ay074N,3NABmtfO8G8s96WFGhbR7F,5jOiYJPp5e84cnK2KO1aNz|437317",
  song: "song/aurora-sofia",
} as const satisfies Track
