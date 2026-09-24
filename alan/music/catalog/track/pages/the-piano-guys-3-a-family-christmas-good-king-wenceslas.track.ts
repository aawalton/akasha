import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasGoodKingWenceslas = {
  id: "01a0afa2-1758-7354-940a-b705ea69ebe5",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-good-king-wenceslas",
  ownLength: 3.8743833333333333,
  ownProgress: 3.8743833333333333,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Good King Wenceslas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Traditional" }, { artist: "artist/the-piano-guys" }],
  trackKey: "goodkingwenceslas|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf|232463",
  song: "song/the-piano-guys-good-king-wenceslas",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-a-family-christmas",
      discNumber: 1,
      position: 3,
      externalId: "7bhwnZvz6oDszzeGAFG6kn",
      externalLink: "https://open.spotify.com/track/7bhwnZvz6oDszzeGAFG6kn",
    },
  ],
} as const satisfies Track
