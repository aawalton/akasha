import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterWhyWhy = {
  id: "01a0b111-32ad-7924-a7f9-dcceb04e1d75",
  type: "page-type/track",
  slug: "sabrina-carpenter-why-why",
  ownLength: 2.8516,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-why"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1byScELwcJffsdL5QWa6Yk",
      externalLink: "https://open.spotify.com/track/1byScELwcJffsdL5QWa6Yk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Why",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "why|74KM79TiuVKeVCqs8QtB0B|171096",
  song: "song/sabrina-carpenter-why",
} as const satisfies Track
