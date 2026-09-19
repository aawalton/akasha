import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterHoneymoonFadesHoneymoonFades = {
  id: "01a0b111-2fb0-715e-b17d-0f962bad9ecf",
  type: "page-type/track",
  slug: "sabrina-carpenter-honeymoon-fades-honeymoon-fades",
  ownLength: 3.252683333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-honeymoon-fades"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2o2R6ghiVJfAqEXnlmOihz",
      externalLink: "https://open.spotify.com/track/2o2R6ghiVJfAqEXnlmOihz",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Honeymoon Fades",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "honeymoonfades|74KM79TiuVKeVCqs8QtB0B|195161",
  song: "song/sabrina-carpenter-honeymoon-fades",
} as const satisfies Track
