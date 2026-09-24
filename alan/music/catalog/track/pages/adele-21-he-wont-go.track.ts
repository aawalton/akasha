import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21HeWontGo = {
  id: "01a0d52b-c25a-7735-a340-5273090c94c4",
  type: "page-type/track",
  slug: "adele-21-he-wont-go",
  ownLength: 4.634,
  ownProgress: 0,
  partOfCollections: ["release/adele-21"],
  status: "not-started",
  unit: "unit/minutes",
  title: "He Won't Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "hewontgo|4dpARuHxo51G3z768sgnrY|278040",
  song: "song/adele-he-wont-go",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 6,
      externalId: "3uVsdnIglL7aTjm8X08J0M",
      externalLink: "https://open.spotify.com/track/3uVsdnIglL7aTjm8X08J0M",
    },
  ],
} as const satisfies Track
