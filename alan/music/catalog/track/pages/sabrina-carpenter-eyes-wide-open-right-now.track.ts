import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenRightNow = {
  id: "01a0b111-295c-701e-abdf-f3e32be6af8a",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-right-now",
  ownLength: 3.5871,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3hqJdqziOPbu422kXaOyII",
      externalLink: "https://open.spotify.com/track/3hqJdqziOPbu422kXaOyII",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Right Now",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "rightnow|74KM79TiuVKeVCqs8QtB0B|215226",
} as const satisfies Track
