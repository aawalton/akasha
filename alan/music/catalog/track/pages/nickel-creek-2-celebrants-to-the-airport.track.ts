import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsToTheAirport = {
  id: "01a0caa8-a917-7dd8-a263-0d7337296eb8",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-to-the-airport",
  ownLength: 4.04295,
  ownProgress: 4.04295,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "To the Airport",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "totheairport|3bcLBxvaI7GsBzGp3WHnwQ|242577",
  song: "song/nickel-creek-to-the-airport",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 13,
      externalId: "0fCis0169297twtJOSOAQs",
      externalLink: "https://open.spotify.com/track/0fCis0169297twtJOSOAQs",
    },
  ],
} as const satisfies Track
