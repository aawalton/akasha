import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleABlueBaby = {
  id: "01a0b4c8-2eb2-7b97-9f2e-82f3c326f008",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-a-blue-baby",
  ownLength: 2.8553333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ZSdMCEdZ2oonnlrFqfoRO",
      externalLink: "https://open.spotify.com/track/3ZSdMCEdZ2oonnlrFqfoRO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Blue Baby",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "abluebaby|7FQRbf8gbKw8KZQZAJWxH2|171320",
  song: "song/paul-cardall-a-blue-baby",
} as const satisfies Track
