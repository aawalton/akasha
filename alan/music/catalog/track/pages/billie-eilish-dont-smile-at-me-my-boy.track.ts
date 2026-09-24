import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeMyBoy = {
  id: "01a0b638-eb9a-7aa9-9f43-2dd2dc79f419",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-my-boy",
  ownLength: 2.8475333333333332,
  ownProgress: 2.8475333333333332,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "my boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "myboy|6qqNVTkY8uBg9cP3Jd7DAH|170852",
  song: "song/billie-eilish-my-boy",
  carriedBy: [
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 3,
      externalId: "1RGasjWLZ4qMN7wbtkLa3u",
      externalLink: "https://open.spotify.com/track/1RGasjWLZ4qMN7wbtkLa3u",
    },
  ],
} as const satisfies Track
