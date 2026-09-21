import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheHumansWhoTakeLongWalksInTheForestHome = {
  id: "01a0b638-0aca-7c1f-9fe0-371bc06bdf1a",
  type: "page-type/track",
  slug: "aurora-for-the-humans-who-take-long-walks-in-the-forest-home",
  ownLength: 3.5462166666666666,
  ownProgress: 3.5462166666666666,
  partOfCollections: ["release/aurora-for-the-humans-who-take-long-walks-in-the-forest"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1xCoHZhrKBTc0euoVGwaIy",
      externalLink: "https://open.spotify.com/track/1xCoHZhrKBTc0euoVGwaIy",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "home|1WgXqy2Dd70QQOU7Ay074N|212773",
  song: "song/aurora-home",
  carriedBy: [
    {
      release: "release/aurora-for-the-humans-who-take-long-walks-in-the-forest",
      discNumber: 1,
      position: 3,
      externalId: "1xCoHZhrKBTc0euoVGwaIy",
      externalLink: "https://open.spotify.com/track/1xCoHZhrKBTc0euoVGwaIy",
    },
  ],
} as const satisfies Track
