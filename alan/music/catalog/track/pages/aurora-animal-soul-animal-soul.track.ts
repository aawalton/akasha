import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAnimalSoulAnimalSoul = {
  id: "01a0b638-007f-7680-b9ee-493fd7f819d9",
  type: "page-type/track",
  slug: "aurora-animal-soul-animal-soul",
  ownLength: 3.0366666666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-animal-soul"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KLkPSUno2eKn6L23liMbf",
      externalLink: "https://open.spotify.com/track/6KLkPSUno2eKn6L23liMbf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Animal Soul",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "animalsoul|1WgXqy2Dd70QQOU7Ay074N|182200",
} as const satisfies Track
