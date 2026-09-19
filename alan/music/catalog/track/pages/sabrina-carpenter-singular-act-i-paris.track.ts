import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIParis = {
  id: "01a0b111-2631-7130-a21d-91d79fbfc811",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-paris",
  ownLength: 3.6346666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "359HNzfOXhCMHB1pNKhyfH",
      externalLink: "https://open.spotify.com/track/359HNzfOXhCMHB1pNKhyfH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Paris",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "paris|74KM79TiuVKeVCqs8QtB0B|218080",
  song: "song/sabrina-carpenter-paris",
} as const satisfies Track
