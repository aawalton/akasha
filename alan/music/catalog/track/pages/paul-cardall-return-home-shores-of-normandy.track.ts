import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeShoresOfNormandy = {
  id: "01a0b4c8-296b-7725-b7ba-6cd5d464911a",
  type: "page-type/track",
  slug: "paul-cardall-return-home-shores-of-normandy",
  ownLength: 4.3414,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3maPoucDMtNGQboxczfjnV",
      externalLink: "https://open.spotify.com/track/3maPoucDMtNGQboxczfjnV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Shores of Normandy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "shoresofnormandy|7FQRbf8gbKw8KZQZAJWxH2|260484",
} as const satisfies Track
