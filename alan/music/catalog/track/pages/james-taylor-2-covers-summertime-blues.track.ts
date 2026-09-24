import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSummertimeBlues = {
  id: "01a0abeb-34ec-7af7-8f2d-776a81bc3ac4",
  type: "page-type/track",
  slug: "james-taylor-2-covers-summertime-blues",
  ownLength: 2.6642166666666665,
  ownProgress: 2.6642166666666665,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Summertime Blues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "summertimeblues|0vn7UBvSQECKJm2817Yf1P|159853",
  song: "song/james-taylor-summertime-blues",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 11,
      externalId: "6m1Ff8NSiHXTa4YjOAesqE",
      externalLink: "https://open.spotify.com/track/6m1Ff8NSiHXTa4YjOAesqE",
    },
  ],
} as const satisfies Track
