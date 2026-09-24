import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeGratitude = {
  id: "01a0b4c8-4062-72bc-bba1-354b4c1b51a7",
  type: "page-type/track",
  slug: "paul-cardall-new-life-gratitude",
  ownLength: 2.4268833333333335,
  ownProgress: 2.4268833333333335,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gratitude",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "gratitude|7FQRbf8gbKw8KZQZAJWxH2|145613",
  song: "song/paul-cardall-gratitude",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 14,
      externalId: "6WIh9oduvrvkxRYVBxYJAn",
      externalLink: "https://open.spotify.com/track/6WIh9oduvrvkxRYVBxYJAn",
    },
  ],
} as const satisfies Track
