import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiICantStopMe = {
  id: "01a0b111-2526-76c3-8600-0bdabb261668",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-i-cant-stop-me",
  ownLength: 3.7016833333333334,
  ownProgress: 3.7016833333333334,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Can't Stop Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }, { artistName: "Saweetie" }],
  trackKey: "icantstopme|6cK3NBO6uP7hh0oyuVELFl,74KM79TiuVKeVCqs8QtB0B|222101",
  song: "song/sabrina-carpenter-i-cant-stop-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 3,
      externalId: "1AVVv4FgNLxQlV64j7dfP1",
      externalLink: "https://open.spotify.com/track/1AVVv4FgNLxQlV64j7dfP1",
    },
  ],
} as const satisfies Track
