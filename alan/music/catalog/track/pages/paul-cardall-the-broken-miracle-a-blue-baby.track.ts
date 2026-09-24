import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleABlueBaby = {
  id: "01a0b4c8-2eb2-7b97-9f2e-82f3c326f008",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-a-blue-baby",
  ownLength: 2.8553333333333333,
  ownProgress: 2.8553333333333333,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Blue Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "abluebaby|7FQRbf8gbKw8KZQZAJWxH2|171320",
  song: "song/paul-cardall-a-blue-baby",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 1,
      externalId: "3ZSdMCEdZ2oonnlrFqfoRO",
      externalLink: "https://open.spotify.com/track/3ZSdMCEdZ2oonnlrFqfoRO",
    },
  ],
} as const satisfies Track
