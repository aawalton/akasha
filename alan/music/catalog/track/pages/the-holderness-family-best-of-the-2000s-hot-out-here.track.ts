import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sHotOutHere = {
  id: "01a0b4c6-cd41-7c16-8725-3039362db928",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-hot-out-here",
  ownLength: 2.0796,
  ownProgress: 2.0796,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hot Out Here",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "hotouthere|6tITG4T8LpC0msapZ4wXGA|124776",
  song: "song/the-holderness-family-hot-out-here",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-2000s",
      discNumber: 1,
      position: 2,
      externalId: "1eSQTixZg5XDh6Iz5miiAE",
      externalLink: "https://open.spotify.com/track/1eSQTixZg5XDh6Iz5miiAE",
    },
  ],
} as const satisfies Track
