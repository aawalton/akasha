import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayAmericanIdiotTheOriginalBroadwayCastRecording = {
  id: "01a0676a-d717-7008-9052-12bf42948e2e",
  type: "page-type/release",
  slug: "green-day-american-idiot-the-original-broadway-cast-recording",
  title: "American Idiot - The Original Broadway Cast Recording",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 83.1288,
  ownProgress: 83.1288,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2010-04-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wO2srr9om17YtEvouoBue",
      externalLink: "https://open.spotify.com/album/1wO2srr9om17YtEvouoBue",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
