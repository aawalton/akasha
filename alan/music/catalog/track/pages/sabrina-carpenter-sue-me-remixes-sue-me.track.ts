import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMe = {
  id: "01a0b111-303a-7be0-8c09-d611f94d622a",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me",
  ownLength: 2.986,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0EUfhpYpiA7ErIWAU7P4gx",
      externalLink: "https://open.spotify.com/track/0EUfhpYpiA7ErIWAU7P4gx",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sue Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "sueme|74KM79TiuVKeVCqs8QtB0B|179160",
} as const satisfies Track
