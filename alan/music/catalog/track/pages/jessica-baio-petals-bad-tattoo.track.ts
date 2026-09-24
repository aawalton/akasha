import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioPetalsBadTattoo = {
  id: "01a0c622-202d-7b53-b7a2-9c1a25028dd9",
  type: "page-type/track",
  slug: "jessica-baio-petals-bad-tattoo",
  ownLength: 2.68305,
  ownProgress: 2.68305,
  partOfCollections: ["release/jessica-baio-petals", "release/jessica-baio-bad-tattoo"],
  status: "completed",
  unit: "unit/minutes",
  title: "bad tattoo",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "badtattoo|0VMFTqmv0hYlWruyBERT95|160983",
  song: "song/jessica-baio-bad-tattoo",
  carriedBy: [
    {
      release: "release/jessica-baio-bad-tattoo",
      discNumber: 1,
      position: 1,
      externalId: "7iUhMgffcOTVXrpBKP0wxm",
      externalLink: "https://open.spotify.com/track/7iUhMgffcOTVXrpBKP0wxm",
    },
    {
      release: "release/jessica-baio-petals",
      discNumber: 1,
      position: 2,
      externalId: "45tB3ohAQC9Ys9MqyuhT4e",
      externalLink: "https://open.spotify.com/track/45tB3ohAQC9Ys9MqyuhT4e",
    },
  ],
} as const satisfies Track
