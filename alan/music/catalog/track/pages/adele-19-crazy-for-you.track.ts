import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19CrazyForYou = {
  id: "01a0d52b-c259-7a9f-9424-1402f7a2af5f",
  type: "page-type/track",
  slug: "adele-19-crazy-for-you",
  ownLength: 3.4673333333333334,
  ownProgress: 3.4673333333333334,
  partOfCollections: ["release/adele-19"],
  status: "completed",
  unit: "unit/minutes",
  title: "Crazy For You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "crazyforyou|4dpARuHxo51G3z768sgnrY|208040",
  song: "song/adele-crazy-for-you",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 5,
      externalId: "4ctqnEqD3gtjIGouiZaxOH",
      externalLink: "https://open.spotify.com/track/4ctqnEqD3gtjIGouiZaxOH",
    },
  ],
} as const satisfies Track
