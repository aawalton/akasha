import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioTrustIssues = {
  id: "01a0676a-d72f-7022-921c-b3bdd2bad1bb",
  type: "page-type/release",
  slug: "jessica-baio-trust-issues",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2022-09-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ANMXCeMCSxdjTHoP8UpnU",
      externalLink: "https://open.spotify.com/album/2ANMXCeMCSxdjTHoP8UpnU",
    },
  ],
  title: "trust issues",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
