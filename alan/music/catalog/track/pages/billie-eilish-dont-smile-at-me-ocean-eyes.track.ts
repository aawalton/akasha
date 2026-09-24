import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeOceanEyes = {
  id: "01a0b638-ec2e-7af1-8bd1-67cbf5c67a7d",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-ocean-eyes",
  ownLength: 3.33965,
  ownProgress: 3.33965,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "ocean eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "oceaneyes|6qqNVTkY8uBg9cP3Jd7DAH|200379",
  song: "song/billie-eilish-ocean-eyes",
  carriedBy: [
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 7,
      externalId: "7hDVYcQq6MxkdJGweuCtl9",
      externalLink: "https://open.spotify.com/track/7hDVYcQq6MxkdJGweuCtl9",
    },
  ],
} as const satisfies Track
