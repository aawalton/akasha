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
} as const satisfies Release
