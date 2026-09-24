import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleMyHeartBeatsForYou = {
  id: "01a0b4c8-303b-72c9-8d20-ce48ce1b2a2b",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-my-heart-beats-for-you",
  ownLength: 3.5691,
  ownProgress: 3.5691,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Heart Beats for You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "David Archuleta" }],
  trackKey: "myheartbeatsforyou|2C9n4tQgNLhHPhSCmdsQnk,7FQRbf8gbKw8KZQZAJWxH2|214146",
  song: "song/paul-cardall-my-heart-beats-for-you",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 12,
      externalId: "6lBlcWYG8i6yMjaP8E7UAh",
      externalLink: "https://open.spotify.com/track/6lBlcWYG8i6yMjaP8E7UAh",
    },
  ],
} as const satisfies Track
