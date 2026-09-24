import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterWhyWhy = {
  id: "01a0b111-32ad-7924-a7f9-dcceb04e1d75",
  type: "page-type/track",
  slug: "sabrina-carpenter-why-why",
  ownLength: 2.8516,
  ownProgress: 2.8516,
  partOfCollections: ["release/sabrina-carpenter-why"],
  status: "completed",
  unit: "unit/minutes",
  title: "Why",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "why|74KM79TiuVKeVCqs8QtB0B|171096",
  song: "song/sabrina-carpenter-why",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-why",
      discNumber: 1,
      position: 1,
      externalId: "1byScELwcJffsdL5QWa6Yk",
      externalLink: "https://open.spotify.com/track/1byScELwcJffsdL5QWa6Yk",
    },
  ],
} as const satisfies Track
