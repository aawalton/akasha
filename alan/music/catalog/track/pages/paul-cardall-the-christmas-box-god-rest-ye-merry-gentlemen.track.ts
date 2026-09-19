import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxGodRestYeMerryGentlemen = {
  id: "01a0b4c8-66b3-773b-8be8-aceb774e223e",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-god-rest-ye-merry-gentlemen",
  ownLength: 2.352883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MnwEK433rqNFJ8gh1x90V",
      externalLink: "https://open.spotify.com/track/5MnwEK433rqNFJ8gh1x90V",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "God Rest Ye Merry Gentlemen",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "godrestyemerrygentlemen|7FQRbf8gbKw8KZQZAJWxH2|141173",
  song: "song/paul-cardall-god-rest-ye-merry-gentlemen",
} as const satisfies Track
