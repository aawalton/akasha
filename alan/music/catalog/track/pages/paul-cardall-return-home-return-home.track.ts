import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeReturnHome = {
  id: "01a0b4c8-2a12-79da-8c65-0ff9dce41b3c",
  type: "page-type/track",
  slug: "paul-cardall-return-home-return-home",
  ownLength: 2.5959,
  ownProgress: 2.5959,
  partOfCollections: ["release/paul-cardall-return-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Return Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "returnhome|7FQRbf8gbKw8KZQZAJWxH2|155754",
  song: "song/paul-cardall-return-home",
  carriedBy: [
    {
      release: "release/paul-cardall-return-home",
      discNumber: 1,
      position: 12,
      externalId: "48JD5xGtUJiKQJJAx8CzSp",
      externalLink: "https://open.spotify.com/track/48JD5xGtUJiKQJJAx8CzSp",
    },
  ],
} as const satisfies Track
