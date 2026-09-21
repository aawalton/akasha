import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulLessComplicated = {
  id: "01a0b4c8-5ab4-7282-8ae4-3e9a4dc5235e",
  type: "page-type/track",
  slug: "paul-cardall-faithful-less-complicated",
  ownLength: 4.333333333333333,
  ownProgress: 4.333333333333333,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7v1rN1m377TBFBkEsl9c4g",
      externalLink: "https://open.spotify.com/track/7v1rN1m377TBFBkEsl9c4g",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Less Complicated",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "lesscomplicated|7FQRbf8gbKw8KZQZAJWxH2|260000",
  song: "song/paul-cardall-less-complicated",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 11,
      externalId: "7v1rN1m377TBFBkEsl9c4g",
      externalLink: "https://open.spotify.com/track/7v1rN1m377TBFBkEsl9c4g",
    },
  ],
} as const satisfies Track
