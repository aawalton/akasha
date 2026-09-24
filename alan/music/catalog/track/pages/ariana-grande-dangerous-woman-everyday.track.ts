import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanEveryday = {
  id: "01a0a6c5-2c3e-7d54-9e1a-05d3cdb06b79",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-everyday",
  ownLength: 3.247333333333333,
  ownProgress: 3.247333333333333,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everyday",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Future" }],
  trackKey: "everyday|1RyvyyTE3xzB2ZywiAwp0i,66CXWjxzNUsdJxJ2JdwvnR|194840",
  song: "song/ariana-grande-everyday",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 9,
      externalId: "53SfB4huCgiRGmwzJdEo1u",
      externalLink: "https://open.spotify.com/track/53SfB4huCgiRGmwzJdEo1u",
    },
  ],
} as const satisfies Track
