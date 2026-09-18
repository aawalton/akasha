import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeGraciesTheme = {
  id: "01a0b4c8-3f23-7207-9ed1-858a997dc799",
  type: "page-type/track",
  slug: "paul-cardall-new-life-gracies-theme",
  ownLength: 5.694883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Pii4GK1kaVUeoxmBB0rUr",
      externalLink: "https://open.spotify.com/track/6Pii4GK1kaVUeoxmBB0rUr",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gracie's Theme",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "graciestheme|7FQRbf8gbKw8KZQZAJWxH2|341693",
} as const satisfies Track
