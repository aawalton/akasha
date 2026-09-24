import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19MeltMyHeartToStone = {
  id: "01a0d52b-c259-7176-8a75-cf869f5f6db7",
  type: "page-type/track",
  slug: "adele-19-melt-my-heart-to-stone",
  ownLength: 3.398433333333333,
  ownProgress: 3.398433333333333,
  partOfCollections: ["release/adele-19"],
  status: "completed",
  unit: "unit/minutes",
  title: "Melt My Heart to Stone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "meltmyhearttostone|4dpARuHxo51G3z768sgnrY|203906",
  song: "song/adele-melt-my-heart-to-stone",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 6,
      externalId: "1Ujuabe6tYXRDgmTk9j3K9",
      externalLink: "https://open.spotify.com/track/1Ujuabe6tYXRDgmTk9j3K9",
    },
  ],
} as const satisfies Track
