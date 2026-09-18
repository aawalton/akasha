import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishEverythingIWantedEverythingIWanted = {
  id: "01a0b638-ea0c-7349-87e8-1b6fa1274ce6",
  type: "page-type/track",
  slug: "billie-eilish-everything-i-wanted-everything-i-wanted",
  ownLength: 4.090416666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-everything-i-wanted"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ZCTVFBt2Brf31RLEnCkWJ",
      externalLink: "https://open.spotify.com/track/3ZCTVFBt2Brf31RLEnCkWJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "everything i wanted",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "everythingiwanted|6qqNVTkY8uBg9cP3Jd7DAH|245425",
} as const satisfies Track
