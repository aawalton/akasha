import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheHumansWhoTakeLongWalksInTheForestRunningWithTheWolves = {
  id: "01a0b638-0b1e-7971-a5c8-c4457a8492ef",
  type: "page-type/track",
  slug: "aurora-for-the-humans-who-take-long-walks-in-the-forest-running-with-the-wolves",
  ownLength: 3.246,
  ownProgress: 0,
  partOfCollections: ["release/aurora-for-the-humans-who-take-long-walks-in-the-forest"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bfjYEPrxfnVumLzf4Z7PG",
      externalLink: "https://open.spotify.com/track/3bfjYEPrxfnVumLzf4Z7PG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Running with the Wolves",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runningwiththewolves|1WgXqy2Dd70QQOU7Ay074N|194760",
  song: "song/aurora-running-with-the-wolves",
} as const satisfies Track
