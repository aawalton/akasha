import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21Lovesong = {
  id: "01a0d52b-c25a-7f63-bf8b-8c17b3060eed",
  type: "page-type/track",
  slug: "adele-21-lovesong",
  ownLength: 5.270666666666667,
  ownProgress: 5.270666666666667,
  partOfCollections: ["release/adele-21"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lovesong",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "lovesong|4dpARuHxo51G3z768sgnrY|316240",
  song: "song/adele-lovesong",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 10,
      externalId: "7nm6DlSzzJTH1rk2e6EgJz",
      externalLink: "https://open.spotify.com/track/7nm6DlSzzJTH1rk2e6EgJz",
    },
  ],
} as const satisfies Track
