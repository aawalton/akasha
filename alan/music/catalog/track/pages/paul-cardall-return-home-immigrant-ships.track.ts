import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeImmigrantShips = {
  id: "01a0b4c8-2848-769d-aec4-d76698e8de7b",
  type: "page-type/track",
  slug: "paul-cardall-return-home-immigrant-ships",
  ownLength: 3.4407,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5I9sO4QS6sO4mDjxmoxT8b",
      externalLink: "https://open.spotify.com/track/5I9sO4QS6sO4mDjxmoxT8b",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Immigrant Ships",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "immigrantships|7FQRbf8gbKw8KZQZAJWxH2|206442",
  song: "song/paul-cardall-immigrant-ships",
} as const satisfies Track
