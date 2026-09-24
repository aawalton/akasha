import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasDeckTheHalls = {
  id: "01a0abea-5709-7478-8c7e-52588ad1976e",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-deck-the-halls",
  ownLength: 2.4468833333333335,
  ownProgress: 2.4468833333333335,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Deck The Halls",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "deckthehalls|6NWtt9pNOL2Gx7kBykdE5x|146813",
  song: "song/celtic-woman-deck-the-halls",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 4,
      externalId: "5RyR98iCSoimGLTMiH3a9t",
      externalLink: "https://open.spotify.com/track/5RyR98iCSoimGLTMiH3a9t",
    },
  ],
} as const satisfies Track
