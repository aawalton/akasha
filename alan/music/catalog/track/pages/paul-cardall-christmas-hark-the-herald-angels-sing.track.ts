import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHarkTheHeraldAngelsSing = {
  id: "01a0b4c8-33a0-71c8-ac07-b6b9b811ebe2",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hark-the-herald-angels-sing",
  ownLength: 3.7,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GmEeSXzkh2DcbYvFUDfcY",
      externalLink: "https://open.spotify.com/track/3GmEeSXzkh2DcbYvFUDfcY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hark! the Herald Angels Sing",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "harktheheraldangelssing|7FQRbf8gbKw8KZQZAJWxH2|222000",
  song: "song/paul-cardall-hark-the-herald-angels-sing",
} as const satisfies Track
