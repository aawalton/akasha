import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsLifeInTechnicolor = {
  id: "01a0b9ee-e274-757f-bc01-13ee4c8ee989",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-life-in-technicolor",
  ownLength: 2.48555,
  ownProgress: 2.48555,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Life in Technicolor",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "lifeintechnicolor|4gzpq5DPGxSnKTe4SA8HAU|149133",
  song: "song/coldplay-life-in-technicolor",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 1,
      externalId: "1rkbMXhEjIytsUGbhoR5pn",
      externalLink: "https://open.spotify.com/track/1rkbMXhEjIytsUGbhoR5pn",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 1,
      externalId: "21E3m3rXhgWjQTo32scmfy",
      externalLink: "https://open.spotify.com/track/21E3m3rXhgWjQTo32scmfy",
    },
  ],
} as const satisfies Track
