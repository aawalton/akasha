import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleEpilogue = {
  id: "01a0b4c8-3143-7624-9b55-81082afcb989",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-epilogue",
  ownLength: 1.4357666666666666,
  ownProgress: 1.4357666666666666,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Epilogue",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "epilogue|7FQRbf8gbKw8KZQZAJWxH2|86146",
  song: "song/paul-cardall-epilogue",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 19,
      externalId: "2MN8n7m7cWwZqnRW2RxbWc",
      externalLink: "https://open.spotify.com/track/2MN8n7m7cWwZqnRW2RxbWc",
    },
  ],
} as const satisfies Track
