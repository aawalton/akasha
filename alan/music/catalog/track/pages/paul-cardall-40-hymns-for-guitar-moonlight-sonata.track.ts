import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarMoonlightSonata = {
  id: "01a0b4c8-1aee-72de-9343-13da73e6d323",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-moonlight-sonata",
  ownLength: 4.716666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zhEK6t7T5uACpRjmJ6JBu",
      externalLink: "https://open.spotify.com/track/1zhEK6t7T5uACpRjmJ6JBu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Moonlight Sonata",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "moonlightsonata|7FQRbf8gbKw8KZQZAJWxH2|283000",
  song: "song/paul-cardall-moonlight-sonata",
} as const satisfies Track
