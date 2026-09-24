import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverLostCause = {
  id: "01a0b638-e47d-7c25-b372-01322e1327f1",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-lost-cause",
  ownLength: 3.5416,
  ownProgress: 3.5416,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost Cause",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "lostcause|6qqNVTkY8uBg9cP3Jd7DAH|212496",
  song: "song/billie-eilish-lost-cause",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 7,
      externalId: "4191RXFPa7Ge9XkA4cWlna",
      externalLink: "https://open.spotify.com/track/4191RXFPa7Ge9XkA4cWlna",
    },
  ],
} as const satisfies Track
