import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkHerTownTooWithJDSouther = {
  id: "01a0abeb-4354-7692-a2c7-c29029e344dc",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-her-town-too-with-j-d-souther",
  ownLength: 4.574,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ukAkL7aLVrDf7x2XiUkNZ",
      externalLink: "https://open.spotify.com/track/3ukAkL7aLVrDf7x2XiUkNZ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Her Town Too (with J.D. Souther)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "0I7UnRLIdCD310ZBgeuqh5", artistName: "JD Souther" },
  ],
  trackKey: "hertowntoowithjdsouther|0I7UnRLIdCD310ZBgeuqh5,0vn7UBvSQECKJm2817Yf1P|274440",
  song: "song/james-taylor-her-town-too",
} as const satisfies Track
