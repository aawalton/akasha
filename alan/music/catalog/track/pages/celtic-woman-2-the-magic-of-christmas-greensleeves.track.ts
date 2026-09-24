import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasGreensleeves = {
  id: "01a0abea-5794-7c16-8bbe-51b60f1aa989",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-greensleeves",
  ownLength: 3.6151,
  ownProgress: 3.6151,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Greensleeves",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "greensleeves|6NWtt9pNOL2Gx7kBykdE5x|216906",
  song: "song/celtic-woman-greensleeves",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 9,
      externalId: "5E0QjQR6LUqVdz47O7a0Mt",
      externalLink: "https://open.spotify.com/track/5E0QjQR6LUqVdz47O7a0Mt",
    },
  ],
} as const satisfies Track
