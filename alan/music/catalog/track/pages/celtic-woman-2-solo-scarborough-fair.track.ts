import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloScarboroughFair = {
  id: "01a0abea-6b10-7c33-85bd-31dcd0496770",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-scarborough-fair",
  ownLength: 3.2169166666666666,
  ownProgress: 3.2169166666666666,
  partOfCollections: ["release/celtic-woman-2-solo"],
  status: "completed",
  unit: "unit/minutes",
  title: "Scarborough Fair",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Hayley Westenra" }],
  trackKey: "scarboroughfair|7Jotu5LupekFt00kZZZ7C6|193015",
  song: "song/celtic-woman-scarborough-fair",
  carriedBy: [
    {
      release: "release/celtic-woman-2-solo",
      discNumber: 1,
      position: 8,
      externalId: "7g6sxwha7UIE9jLrUYXcYT",
      externalLink: "https://open.spotify.com/track/7g6sxwha7UIE9jLrUYXcYT",
    },
  ],
} as const satisfies Track
