import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishComeOutAndPlayComeOutAndPlay = {
  id: "01a0b638-ea86-7b84-bfe0-f1a6f9c95f95",
  type: "page-type/track",
  slug: "billie-eilish-come-out-and-play-come-out-and-play",
  ownLength: 3.50625,
  ownProgress: 3.50625,
  partOfCollections: ["release/billie-eilish-come-out-and-play"],
  status: "completed",
  unit: "unit/minutes",
  title: "come out and play",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "comeoutandplay|6qqNVTkY8uBg9cP3Jd7DAH|210375",
  song: "song/billie-eilish-come-out-and-play",
  carriedBy: [
    {
      release: "release/billie-eilish-come-out-and-play",
      discNumber: 1,
      position: 1,
      externalId: "7wC5eZcFS1Q1BsQ35DU6H4",
      externalLink: "https://open.spotify.com/track/7wC5eZcFS1Q1BsQ35DU6H4",
    },
  ],
} as const satisfies Track
