import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishEverythingIWantedEverythingIWanted = {
  id: "01a0b638-ea0c-7349-87e8-1b6fa1274ce6",
  type: "page-type/track",
  slug: "billie-eilish-everything-i-wanted-everything-i-wanted",
  ownLength: 4.090416666666667,
  ownProgress: 4.090416666666667,
  partOfCollections: ["release/billie-eilish-everything-i-wanted"],
  status: "completed",
  unit: "unit/minutes",
  title: "everything i wanted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "everythingiwanted|6qqNVTkY8uBg9cP3Jd7DAH|245425",
  song: "song/billie-eilish-everything-i-wanted",
  carriedBy: [
    {
      release: "release/billie-eilish-everything-i-wanted",
      discNumber: 1,
      position: 1,
      externalId: "3ZCTVFBt2Brf31RLEnCkWJ",
      externalLink: "https://open.spotify.com/track/3ZCTVFBt2Brf31RLEnCkWJ",
    },
  ],
} as const satisfies Track
