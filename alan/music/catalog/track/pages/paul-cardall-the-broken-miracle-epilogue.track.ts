import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleEpilogue = {
  id: "01a0b4c8-3143-7624-9b55-81082afcb989",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-epilogue",
  ownLength: 1.4357666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2MN8n7m7cWwZqnRW2RxbWc",
      externalLink: "https://open.spotify.com/track/2MN8n7m7cWwZqnRW2RxbWc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Epilogue",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "epilogue|7FQRbf8gbKw8KZQZAJWxH2|86146",
} as const satisfies Track
