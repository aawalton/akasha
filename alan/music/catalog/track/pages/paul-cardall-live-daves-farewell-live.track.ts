import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveDavesFarewellLive = {
  id: "01a0b4c8-592a-7628-962a-eef7dff12ff1",
  type: "page-type/track",
  slug: "paul-cardall-live-daves-farewell-live",
  ownLength: 3.59555,
  ownProgress: 3.59555,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dave's Farewell - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "davesfarewelllive|7FQRbf8gbKw8KZQZAJWxH2|215733",
  song: "song/paul-cardall-daves-farewell",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 13,
      externalId: "2ECRrUUmcf5yyxTPblqXEk",
      externalLink: "https://open.spotify.com/track/2ECRrUUmcf5yyxTPblqXEk",
    },
  ],
} as const satisfies Track
