import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2022TheCharcuterieSong = {
  id: "01a0b4c6-c82b-73bf-a2b4-fcc28696afed",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2022-the-charcuterie-song",
  ownLength: 2.0608,
  ownProgress: 2.0608,
  partOfCollections: ["release/the-holderness-family-best-of-2022"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Charcuterie Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "thecharcuteriesong|6tITG4T8LpC0msapZ4wXGA|123648",
  song: "song/the-holderness-family-the-charcuterie-song",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-2022",
      discNumber: 1,
      position: 3,
      externalId: "7qGDs1gmV4vvzYIjkCRqR5",
      externalLink: "https://open.spotify.com/track/7qGDs1gmV4vvzYIjkCRqR5",
    },
  ],
} as const satisfies Track
