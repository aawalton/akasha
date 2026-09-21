import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationTheLittleDrummerBoy = {
  id: "01a0abea-77c7-7364-b99d-516de4d3cd8e",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-the-little-drummer-boy",
  ownLength: 3.778216666666667,
  ownProgress: 3.778216666666667,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Hzd1CvlV8srxrVu4bdsxy",
      externalLink: "https://open.spotify.com/track/2Hzd1CvlV8srxrVu4bdsxy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Little Drummer Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thelittledrummerboy|6NWtt9pNOL2Gx7kBykdE5x|226693",
  song: "song/celtic-woman-the-little-drummer-boy",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-christmas-celebration",
      discNumber: 1,
      position: 13,
      externalId: "2Hzd1CvlV8srxrVu4bdsxy",
      externalLink: "https://open.spotify.com/track/2Hzd1CvlV8srxrVu4bdsxy",
    },
  ],
} as const satisfies Track
