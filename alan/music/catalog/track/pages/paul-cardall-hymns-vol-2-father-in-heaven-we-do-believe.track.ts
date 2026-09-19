import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2FatherInHeavenWeDoBelieve = {
  id: "01a0b4c8-5f3a-7798-a80f-e3be87a8d496",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-father-in-heaven-we-do-believe",
  ownLength: 3.27955,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "37FLyQE8Mu06FJLb5YC6zb",
      externalLink: "https://open.spotify.com/track/37FLyQE8Mu06FJLb5YC6zb",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Father in Heaven, We Do Believe",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "fatherinheavenwedobelieve|7FQRbf8gbKw8KZQZAJWxH2|196773",
  song: "song/paul-cardall-father-in-heaven-we-do-believe",
} as const satisfies Track
