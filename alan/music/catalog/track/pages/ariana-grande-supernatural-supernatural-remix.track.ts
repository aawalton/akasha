import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSupernaturalSupernaturalRemix = {
  id: "01a0a6c5-312e-732e-b242-6e88bdf9e32f",
  type: "page-type/track",
  slug: "ariana-grande-supernatural-supernatural-remix",
  ownLength: 2.7230166666666666,
  ownProgress: 2.7230166666666666,
  partOfCollections: ["release/ariana-grande-supernatural"],
  status: "completed",
  unit: "unit/minutes",
  title: "supernatural - remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Troye Sivan" }],
  trackKey: "supernaturalremix|3WGpXCj9YhhfX11TToZcXP,66CXWjxzNUsdJxJ2JdwvnR|163381",
  song: "song/ariana-grande-supernatural",
  carriedBy: [
    {
      release: "release/ariana-grande-supernatural",
      discNumber: 1,
      position: 2,
      externalId: "6GVSrGzoVDTHqb5n8hAIHU",
      externalLink: "https://open.spotify.com/track/6GVSrGzoVDTHqb5n8hAIHU",
    },
  ],
} as const satisfies Track
