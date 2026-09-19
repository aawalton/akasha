import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMeKcLightsRemix = {
  id: "01a0b111-3057-7b6a-8d6a-8aba1c2509b0",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-kc-lights-remix",
  ownLength: 3.3698166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Mtz5ZTbFSkhN4yCirMOIS",
      externalLink: "https://open.spotify.com/track/0Mtz5ZTbFSkhN4yCirMOIS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sue Me - KC Lights Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "0bUZrFj7rstq07E4iAJHgZ", artistName: "KC Lights" },
  ],
  trackKey: "suemekclightsremix|0bUZrFj7rstq07E4iAJHgZ,74KM79TiuVKeVCqs8QtB0B|202189",
  song: "song/sabrina-carpenter-sue-me",
} as const satisfies Track
