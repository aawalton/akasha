import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerPeteDavidson = {
  id: "01a0a6c5-2abc-713e-8f96-c3e10d36d3de",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-pete-davidson",
  ownLength: 1.2302166666666667,
  ownProgress: 1.2302166666666667,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "pete davidson",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "petedavidson|66CXWjxzNUsdJxJ2JdwvnR|73813",
  song: "song/ariana-grande-pete-davidson",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 14,
      externalId: "0XOnMqLQDO89iAg7dWWwnG",
      externalLink: "https://open.spotify.com/track/0XOnMqLQDO89iAg7dWWwnG",
    },
  ],
} as const satisfies Track
