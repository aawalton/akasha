import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagCompanyMan = {
  id: "01a0abeb-447c-7752-a7db-821e41647888",
  type: "page-type/track",
  slug: "james-taylor-2-flag-company-man",
  ownLength: 3.74955,
  ownProgress: 3.74955,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "Company Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "companyman|0vn7UBvSQECKJm2817Yf1P|224973",
  song: "song/james-taylor-company-man",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 1,
      externalId: "7EaGgLksAtCzApLfPxJjtS",
      externalLink: "https://open.spotify.com/track/7EaGgLksAtCzApLfPxJjtS",
    },
  ],
} as const satisfies Track
