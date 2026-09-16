import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversWhyBabyWhy = {
  id: "01a0abeb-3411-76dd-b4e5-90aa61edf44e",
  type: "page-type/track",
  slug: "james-taylor-2-covers-why-baby-why",
  ownLength: 2.678,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4D4nerNiBRsxjVyNdzWJcX",
      externalLink: "https://open.spotify.com/track/4D4nerNiBRsxjVyNdzWJcX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Why Baby Why",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "whybabywhy|0vn7UBvSQECKJm2817Yf1P|160680",
} as const satisfies Track
