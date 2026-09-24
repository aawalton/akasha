import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveHuntersHeartLive = {
  id: "01a0b4c8-583d-7f88-9683-95e277dfa2b5",
  type: "page-type/track",
  slug: "paul-cardall-live-hunters-heart-live",
  ownLength: 3.5102166666666665,
  ownProgress: 3.5102166666666665,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hunter's Heart - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "huntersheartlive|7FQRbf8gbKw8KZQZAJWxH2|210613",
  song: "song/paul-cardall-hunters-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 7,
      externalId: "2oB7BUHgIs8njuXMQNW9O2",
      externalLink: "https://open.spotify.com/track/2oB7BUHgIs8njuXMQNW9O2",
    },
  ],
} as const satisfies Track
