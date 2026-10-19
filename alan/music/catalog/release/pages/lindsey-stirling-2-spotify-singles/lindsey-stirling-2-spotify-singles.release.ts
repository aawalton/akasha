import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirling2SpotifySingles = {
  id: "01a0676a-d72a-7002-ba03-b2e51247a101",
  type: "page-type/release",
  slug: "lindsey-stirling-2-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-11-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1XXSHevNKbENDXqH5iRSEC",
      externalLink: "https://open.spotify.com/album/1XXSHevNKbENDXqH5iRSEC",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
