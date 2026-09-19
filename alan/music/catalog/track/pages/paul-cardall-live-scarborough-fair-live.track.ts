import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveScarboroughFairLive = {
  id: "01a0b4c8-5889-7ec9-bbcc-999b73cc45ee",
  type: "page-type/track",
  slug: "paul-cardall-live-scarborough-fair-live",
  ownLength: 2.8211,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "33fMR35WpgByInrsvZdyL5",
      externalLink: "https://open.spotify.com/track/33fMR35WpgByInrsvZdyL5",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Scarborough Fair - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "scarboroughfairlive|7FQRbf8gbKw8KZQZAJWxH2|169266",
  song: "song/paul-cardall-scarborough-fair",
} as const satisfies Track
