import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSofiaSofiaRadioEdit = {
  id: "01a0b638-052d-7805-9b3d-e499ce36f151",
  type: "page-type/track",
  slug: "aurora-sofia-sofia-radio-edit",
  ownLength: 3.94465,
  ownProgress: 0,
  partOfCollections: ["release/aurora-sofia"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6tIG643TwrkFMSB34jgKtI",
      externalLink: "https://open.spotify.com/track/6tIG643TwrkFMSB34jgKtI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sofia - Radio Edit",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" },
    { externalId: "5jOiYJPp5e84cnK2KO1aNz", artistName: "Iris Caltwait" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
  ],
  trackKey:
    "sofiaradioedit|1WgXqy2Dd70QQOU7Ay074N,3NABmtfO8G8s96WFGhbR7F,5jOiYJPp5e84cnK2KO1aNz|236679",
} as const satisfies Track
