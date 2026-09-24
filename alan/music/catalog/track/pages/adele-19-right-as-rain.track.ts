import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19RightAsRain = {
  id: "01a0d52b-c259-755a-8fb5-051cf73b69e3",
  type: "page-type/track",
  slug: "adele-19-right-as-rain",
  ownLength: 3.2891,
  ownProgress: 3.2891,
  partOfCollections: ["release/adele-19"],
  status: "completed",
  unit: "unit/minutes",
  title: "Right As Rain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "rightasrain|4dpARuHxo51G3z768sgnrY|197346",
  song: "song/adele-right-as-rain",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 8,
      externalId: "6oW04c2E7lebl09WHsBAWO",
      externalLink: "https://open.spotify.com/track/6oW04c2E7lebl09WHsBAWO",
    },
  ],
} as const satisfies Track
