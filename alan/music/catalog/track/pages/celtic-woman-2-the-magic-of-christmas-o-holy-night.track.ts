import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasOHolyNight = {
  id: "01a0abea-575c-7c0c-9485-c7f878d75e05",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-o-holy-night",
  ownLength: 4.34155,
  ownProgress: 4.34155,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "O Holy Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "oholynight|6NWtt9pNOL2Gx7kBykdE5x|260493",
  song: "song/celtic-woman-o-holy-night",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 7,
      externalId: "6W463ll5YkRw9QWoWff0Px",
      externalLink: "https://open.spotify.com/track/6W463ll5YkRw9QWoWff0Px",
    },
  ],
} as const satisfies Track
