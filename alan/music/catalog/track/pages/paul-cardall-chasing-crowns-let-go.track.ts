import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsLetGo = {
  id: "01a0b4c8-21c7-70a5-978c-c454c3f71f3a",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-let-go",
  ownLength: 2.975,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VeffqUMeC7VlyTyP34zjd",
      externalLink: "https://open.spotify.com/track/2VeffqUMeC7VlyTyP34zjd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Let Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "letgo|7FQRbf8gbKw8KZQZAJWxH2|178500",
} as const satisfies Track
