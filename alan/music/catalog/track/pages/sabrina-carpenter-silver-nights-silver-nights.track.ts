import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSilverNightsSilverNights = {
  id: "01a0b111-3393-78d4-8dab-c3ac448935a6",
  type: "page-type/track",
  slug: "sabrina-carpenter-silver-nights-silver-nights",
  ownLength: 2.442,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-silver-nights"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4hBJ3HHSLgaKcMOxWxrKm0",
      externalLink: "https://open.spotify.com/track/4hBJ3HHSLgaKcMOxWxrKm0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Silver Nights",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "silvernights|74KM79TiuVKeVCqs8QtB0B|146520",
} as const satisfies Track
