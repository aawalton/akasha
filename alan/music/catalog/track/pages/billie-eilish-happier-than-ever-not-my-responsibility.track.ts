import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverNotMyResponsibility = {
  id: "01a0b638-e4c4-766f-b913-65c8053e6922",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-not-my-responsibility",
  ownLength: 3.79465,
  ownProgress: 3.79465,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Not My Responsibility",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "notmyresponsibility|6qqNVTkY8uBg9cP3Jd7DAH|227679",
  song: "song/billie-eilish-not-my-responsibility",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 9,
      externalId: "4T2zre0jqstNJ5Gt0WG9lz",
      externalLink: "https://open.spotify.com/track/4T2zre0jqstNJ5Gt0WG9lz",
    },
  ],
} as const satisfies Track
