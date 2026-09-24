import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoRedeemer = {
  id: "01a0b4c8-46eb-71f7-ae1e-0d9429f14c78",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-redeemer",
  ownLength: 5.856216666666667,
  ownProgress: 5.856216666666667,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Redeemer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "redeemer|7FQRbf8gbKw8KZQZAJWxH2|351373",
  song: "song/paul-cardall-redeemer",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 2,
      externalId: "3eBBuWFS8OgVjey6tGeArL",
      externalLink: "https://open.spotify.com/track/3eBBuWFS8OgVjey6tGeArL",
    },
  ],
} as const satisfies Track
