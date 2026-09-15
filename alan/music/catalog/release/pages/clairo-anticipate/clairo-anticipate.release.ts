import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoAnticipate = {
  id: "01a0676a-d717-702a-910b-4fb8079c473f",
  type: "release",
  slug: "clairo-anticipate",
  title: "Anticipate",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 3.154733,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hy99Geeqk41ERKiyLz0b1",
      externalLink: "https://open.spotify.com/album/1hy99Geeqk41ERKiyLz0b1",
    },
  ],
} as const satisfies Release
