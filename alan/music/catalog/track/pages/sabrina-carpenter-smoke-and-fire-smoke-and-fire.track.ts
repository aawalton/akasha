import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSmokeAndFireSmokeAndFire = {
  id: "01a0b111-332b-78e5-a4f4-709d83fdea57",
  type: "page-type/track",
  slug: "sabrina-carpenter-smoke-and-fire-smoke-and-fire",
  ownLength: 3.750166666666667,
  ownProgress: 3.750166666666667,
  partOfCollections: ["release/sabrina-carpenter-smoke-and-fire"],
  status: "completed",
  unit: "unit/minutes",
  title: "Smoke and Fire",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "smokeandfire|74KM79TiuVKeVCqs8QtB0B|225010",
  song: "song/sabrina-carpenter-smoke-and-fire",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-smoke-and-fire",
      discNumber: 1,
      position: 1,
      externalId: "67zT3NI4tTOj8GreXetF6s",
      externalLink: "https://open.spotify.com/track/67zT3NI4tTOj8GreXetF6s",
    },
  ],
} as const satisfies Track
