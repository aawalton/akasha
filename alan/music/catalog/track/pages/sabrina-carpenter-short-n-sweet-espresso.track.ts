import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetEspresso = {
  id: "01a0b111-2045-7ce8-8b2f-f91d983fd91f",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-espresso",
  ownLength: 2.9243166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HRqTpkrJO5ggZyyK6NPWz",
      externalLink: "https://open.spotify.com/track/2HRqTpkrJO5ggZyyK6NPWz",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Espresso",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "espresso|74KM79TiuVKeVCqs8QtB0B|175459",
} as const satisfies Track
