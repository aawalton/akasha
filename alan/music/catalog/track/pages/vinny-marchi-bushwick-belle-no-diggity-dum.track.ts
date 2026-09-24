import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleNoDiggityDum = {
  id: "01a0b112-8f50-753a-b172-2be7b33d0e47",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-no-diggity-dum",
  ownLength: 3.1315,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  status: "not-started",
  unit: "unit/minutes",
  title: "No Diggity Dum",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }, { artistName: "Bobby Bass" }],
  trackKey: "nodiggitydum|0ZM2ioGGBOZ3NPTSUbuimj,5USAMqcbMAzF3HBmeD5pJF|187890",
  song: "song/vinny-marchi-no-diggity-dum",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 6,
      externalId: "5G3w4MRoOmzMHV8dj2HUMS",
      externalLink: "https://open.spotify.com/track/5G3w4MRoOmzMHV8dj2HUMS",
    },
  ],
} as const satisfies Track
