import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsGoodKingWenceslas = {
  id: "01a0b4c8-5545-7a29-bfb8-4f8ea7454968",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-good-king-wenceslas",
  ownLength: 4.608,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6I41mwhctSO8WovoygCOEr",
      externalLink: "https://open.spotify.com/track/6I41mwhctSO8WovoygCOEr",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Good King Wenceslas",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "goodkingwenceslas|7FQRbf8gbKw8KZQZAJWxH2|276480",
  song: "song/paul-cardall-good-king-wenceslas",
} as const satisfies Track
