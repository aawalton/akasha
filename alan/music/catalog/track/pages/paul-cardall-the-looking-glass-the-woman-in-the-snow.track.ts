import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheWomanInTheSnow = {
  id: "01a0b4c8-60f0-726c-970e-d316a0a7c155",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-woman-in-the-snow",
  ownLength: 3.717766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4M8VhwqKbckxnCHeG71eYO",
      externalLink: "https://open.spotify.com/track/4M8VhwqKbckxnCHeG71eYO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Woman In The Snow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thewomaninthesnow|7FQRbf8gbKw8KZQZAJWxH2|223066",
} as const satisfies Track
