import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserIDrinkTheLight = {
  id: "01a0b637-e81c-7384-ba41-37672ed06e73",
  type: "page-type/track",
  slug: "aurora-come-closer-i-drink-the-light",
  grade: "C",
  ownLength: 7.948216666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer", "release/aurora-i-drink-the-light"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I DRINK THE LIGHT",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "idrinkthelight|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|476893",
  song: "song/aurora-i-drink-the-light",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 8,
      externalId: "1YsBC7h8KSnWjQdddkfrnz",
      externalLink: "https://open.spotify.com/track/1YsBC7h8KSnWjQdddkfrnz",
    },
    {
      release: "release/aurora-i-drink-the-light",
      discNumber: 1,
      position: 1,
      externalId: "4ytjR8q5geAVO7EQM9Gjzd",
      externalLink: "https://open.spotify.com/track/4ytjR8q5geAVO7EQM9Gjzd",
    },
  ],
} as const satisfies Track
