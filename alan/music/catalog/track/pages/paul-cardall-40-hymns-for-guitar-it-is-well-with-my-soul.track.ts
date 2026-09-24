import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarItIsWellWithMySoul = {
  id: "01a0b4c8-1877-73c6-8c11-0c2b623861be",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-it-is-well-with-my-soul",
  ownLength: 3.4815833333333335,
  ownProgress: 3.4815833333333335,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "completed",
  unit: "unit/minutes",
  title: "It Is Well with My Soul",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "itiswellwithmysoul|7FQRbf8gbKw8KZQZAJWxH2|208895",
  song: "song/paul-cardall-it-is-well-with-my-soul",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 1,
      externalId: "5WK3XBdYZRiWxW6gW8jjoi",
      externalLink: "https://open.spotify.com/track/5WK3XBdYZRiWxW6gW8jjoi",
    },
  ],
} as const satisfies Track
