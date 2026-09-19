import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionDanzaDelAmor = {
  id: "01a0b4c8-45f7-7e77-bfd3-270a8b6530f6",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-danza-del-amor",
  ownLength: 3.9562333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uiEkbI69LuCvxNp2Nagop",
      externalLink: "https://open.spotify.com/track/0uiEkbI69LuCvxNp2Nagop",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Danza Del Amor",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "danzadelamor|7FQRbf8gbKw8KZQZAJWxH2|237374",
  song: "song/paul-cardall-danza-del-amor",
} as const satisfies Track
