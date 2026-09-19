import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeLoveOneAnother = {
  id: "01a0b4c8-2899-70bb-a29d-ad319ec87f1f",
  type: "page-type/track",
  slug: "paul-cardall-return-home-love-one-another",
  ownLength: 4.01385,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3n8ZTiG1QT4zNQ4qhfSOos",
      externalLink: "https://open.spotify.com/track/3n8ZTiG1QT4zNQ4qhfSOos",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Love One Another",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "loveoneanother|7FQRbf8gbKw8KZQZAJWxH2|240831",
  song: "song/paul-cardall-love-one-another",
} as const satisfies Track
