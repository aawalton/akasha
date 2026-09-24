import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeComingHome = {
  id: "01a0b4c8-3fa9-77b2-bd9b-4dd2d6e1e28c",
  type: "page-type/track",
  slug: "paul-cardall-new-life-coming-home",
  ownLength: 2.102,
  ownProgress: 2.102,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Coming Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "cominghome|7FQRbf8gbKw8KZQZAJWxH2|126120",
  song: "song/paul-cardall-coming-home",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 9,
      externalId: "0zw19xCUkDVCJTZKKUfyQi",
      externalLink: "https://open.spotify.com/track/0zw19xCUkDVCJTZKKUfyQi",
    },
  ],
} as const satisfies Track
