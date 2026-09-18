import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionOurLove = {
  id: "01a0b4c8-467f-7c84-9e22-4fb69274611c",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-our-love",
  ownLength: 3.894416666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WXm5VYbzc3kaoo2jlSRfP",
      externalLink: "https://open.spotify.com/track/0WXm5VYbzc3kaoo2jlSRfP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Our Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ourlove|7FQRbf8gbKw8KZQZAJWxH2|233665",
} as const satisfies Track
