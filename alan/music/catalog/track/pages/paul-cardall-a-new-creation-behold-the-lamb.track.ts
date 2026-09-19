import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationBeholdTheLamb = {
  id: "01a0b4c8-3629-7a7c-b1b0-3ecbabc34683",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-behold-the-lamb",
  ownLength: 1.5388833333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eoKgh60xFf7P5lIrjKgmd",
      externalLink: "https://open.spotify.com/track/2eoKgh60xFf7P5lIrjKgmd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Behold, The Lamb",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "beholdthelamb|7FQRbf8gbKw8KZQZAJWxH2|92333",
  song: "song/paul-cardall-behold-the-lamb",
} as const satisfies Track
