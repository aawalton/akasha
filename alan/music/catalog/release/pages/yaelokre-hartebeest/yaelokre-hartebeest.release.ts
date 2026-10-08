import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreHartebeest = {
  id: "01a0676a-d71f-7057-a778-73bbac487470",
  type: "page-type/release",
  slug: "yaelokre-hartebeest",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2024-01-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eQDx2xXE53YdCxv4aDcnn",
      externalLink: "https://open.spotify.com/album/2eQDx2xXE53YdCxv4aDcnn",
    },
  ],
  title: "Hartebeest",
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
