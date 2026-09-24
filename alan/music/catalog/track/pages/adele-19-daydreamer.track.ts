import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19Daydreamer = {
  id: "01a0d52b-c259-76b1-87fe-76725058d9ed",
  type: "page-type/track",
  slug: "adele-19-daydreamer",
  ownLength: 3.6751,
  ownProgress: 3.6751,
  partOfCollections: ["release/adele-19"],
  status: "completed",
  unit: "unit/minutes",
  title: "Daydreamer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "daydreamer|4dpARuHxo51G3z768sgnrY|220506",
  song: "song/adele-daydreamer",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 1,
      externalId: "1JZkTZEXkLvkR2oQ9PSKuO",
      externalLink: "https://open.spotify.com/track/1JZkTZEXkLvkR2oQ9PSKuO",
    },
  ],
} as const satisfies Track
