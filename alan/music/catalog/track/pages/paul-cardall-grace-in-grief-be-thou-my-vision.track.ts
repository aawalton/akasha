import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefBeThouMyVision = {
  id: "01a0b4c8-25f5-7321-b3f9-53388cb6f426",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-be-thou-my-vision",
  ownLength: 4.141666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7waugxgzyhXxlwY7tOVKL4",
      externalLink: "https://open.spotify.com/track/7waugxgzyhXxlwY7tOVKL4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Be Thou My Vision",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bethoumyvision|7FQRbf8gbKw8KZQZAJWxH2|248500",
  song: "song/paul-cardall-be-thou-my-vision",
} as const satisfies Track
