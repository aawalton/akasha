import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFastTimesFastTimes = {
  id: "01a0b111-2ec4-77d8-b0d6-5974041539c9",
  type: "page-type/track",
  slug: "sabrina-carpenter-fast-times-fast-times",
  ownLength: 2.9089833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fast-times"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0oN3KzKOxYtyIuNiobf8Q4",
      externalLink: "https://open.spotify.com/track/0oN3KzKOxYtyIuNiobf8Q4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Fast Times",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "fasttimes|74KM79TiuVKeVCqs8QtB0B|174539",
  song: "song/sabrina-carpenter-fast-times",
} as const satisfies Track
