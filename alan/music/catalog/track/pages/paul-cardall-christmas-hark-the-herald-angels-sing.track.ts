import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHarkTheHeraldAngelsSing = {
  id: "01a0b4c8-33a0-71c8-ac07-b6b9b811ebe2",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hark-the-herald-angels-sing",
  ownLength: 3.7,
  ownProgress: 3.7,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hark! the Herald Angels Sing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "harktheheraldangelssing|7FQRbf8gbKw8KZQZAJWxH2|222000",
  song: "song/paul-cardall-hark-the-herald-angels-sing",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 1,
      externalId: "3GmEeSXzkh2DcbYvFUDfcY",
      externalLink: "https://open.spotify.com/track/3GmEeSXzkh2DcbYvFUDfcY",
    },
  ],
} as const satisfies Track
