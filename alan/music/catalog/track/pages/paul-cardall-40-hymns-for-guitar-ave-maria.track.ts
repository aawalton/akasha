import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarAveMaria = {
  id: "01a0b4c8-1a04-7f4d-854f-1af19bf5519e",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-ave-maria",
  ownLength: 3.55,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5eeNMimzxqWafuRr8fZbZu",
      externalLink: "https://open.spotify.com/track/5eeNMimzxqWafuRr8fZbZu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ave Maria",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "avemaria|7FQRbf8gbKw8KZQZAJWxH2|213000",
} as const satisfies Track
