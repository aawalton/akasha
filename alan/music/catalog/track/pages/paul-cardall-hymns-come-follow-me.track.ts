import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsComeFollowMe = {
  id: "01a0b4c8-637c-7d46-9c14-8205893b09bd",
  type: "page-type/track",
  slug: "paul-cardall-hymns-come-follow-me",
  ownLength: 2.63355,
  ownProgress: 2.63355,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come, Follow Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "comefollowme|7FQRbf8gbKw8KZQZAJWxH2|158013",
  song: "song/paul-cardall-come-follow-me",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 9,
      externalId: "6AflQvRt7KegL9QPSm2SzD",
      externalLink: "https://open.spotify.com/track/6AflQvRt7KegL9QPSm2SzD",
    },
  ],
} as const satisfies Track
