import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasSilentNight = {
  id: "01a0abea-580a-7999-bf32-96056e91f86c",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-silent-night",
  ownLength: 1.9688833333333333,
  ownProgress: 1.9688833333333333,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "silentnight|6NWtt9pNOL2Gx7kBykdE5x|118133",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 13,
      externalId: "1b2bcC63Wh2my6d1jmY5dz",
      externalLink: "https://open.spotify.com/track/1b2bcC63Wh2my6d1jmY5dz",
    },
  ],
} as const satisfies Track
