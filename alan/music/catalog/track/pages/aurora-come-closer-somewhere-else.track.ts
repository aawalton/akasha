import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserSomewhereElse = {
  id: "01a0b637-e7f1-790c-b90c-ce1d8cb4b8b9",
  type: "page-type/track",
  slug: "aurora-come-closer-somewhere-else",
  ownLength: 4.18955,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ROFunSkVUlXqU0cMi6vYJ",
      externalLink: "https://open.spotify.com/track/4ROFunSkVUlXqU0cMi6vYJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "SOMEWHERE ELSE",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "somewhereelse|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|251373",
} as const satisfies Track
