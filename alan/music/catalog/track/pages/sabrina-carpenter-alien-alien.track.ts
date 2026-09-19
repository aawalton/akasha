import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlienAlien = {
  id: "01a0b111-31d1-7d05-a980-83e43cb8b23c",
  type: "page-type/track",
  slug: "sabrina-carpenter-alien-alien",
  ownLength: 2.914,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-alien"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0RUTnY2B3s05fZuCHsNaUP",
      externalLink: "https://open.spotify.com/track/0RUTnY2B3s05fZuCHsNaUP",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Alien",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "1HBjj22wzbscIZ9sEb5dyf", artistName: "Jonas Blue" },
  ],
  trackKey: "alien|1HBjj22wzbscIZ9sEb5dyf,74KM79TiuVKeVCqs8QtB0B|174840",
  song: "song/sabrina-carpenter-alien",
} as const satisfies Track
