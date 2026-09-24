import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMe6amRemix = {
  id: "01a0b111-3075-79da-9e07-8de74c15fc0b",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-6am-remix",
  ownLength: 2.8916666666666666,
  ownProgress: 2.8916666666666666,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me - 6am Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }, { artistName: "KC Lights" }],
  trackKey: "sueme6amremix|0bUZrFj7rstq07E4iAJHgZ,74KM79TiuVKeVCqs8QtB0B|173500",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sue-me-remixes",
      discNumber: 1,
      position: 3,
      externalId: "4vjhSnvgxQPPg1G3ekSTBZ",
      externalLink: "https://open.spotify.com/track/4vjhSnvgxQPPg1G3ekSTBZ",
    },
  ],
} as const satisfies Track
