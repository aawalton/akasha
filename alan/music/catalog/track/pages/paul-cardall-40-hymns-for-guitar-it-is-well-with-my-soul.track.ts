import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarItIsWellWithMySoul = {
  id: "01a0b4c8-1877-73c6-8c11-0c2b623861be",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-it-is-well-with-my-soul",
  ownLength: 3.4815833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WK3XBdYZRiWxW6gW8jjoi",
      externalLink: "https://open.spotify.com/track/5WK3XBdYZRiWxW6gW8jjoi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "It Is Well with My Soul",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "itiswellwithmysoul|7FQRbf8gbKw8KZQZAJWxH2|208895",
  song: "song/paul-cardall-it-is-well-with-my-soul",
} as const satisfies Track
