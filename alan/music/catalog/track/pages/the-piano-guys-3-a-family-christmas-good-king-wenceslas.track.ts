import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasGoodKingWenceslas = {
  id: "01a0afa2-1758-7354-940a-b705ea69ebe5",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-good-king-wenceslas",
  ownLength: 3.8743833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7bhwnZvz6oDszzeGAFG6kn",
      externalLink: "https://open.spotify.com/track/7bhwnZvz6oDszzeGAFG6kn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Good King Wenceslas",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey: "goodkingwenceslas|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf|232463",
  song: "song/the-piano-guys-good-king-wenceslas",
} as const satisfies Track
