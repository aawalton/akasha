import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiJennyOfOldstonesJennyOfOldstones = {
  id: "01a0b112-9020-7f97-b681-52708007120e",
  type: "page-type/track",
  slug: "vinny-marchi-jenny-of-oldstones-jenny-of-oldstones",
  ownLength: 2.833066666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-jenny-of-oldstones"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Jenny Of Oldstones",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Topher Ngo" },
    { artistName: "Bobby Bass" },
    { artist: "artist/vinny-marchi" },
  ],
  trackKey:
    "jennyofoldstones|0ZM2ioGGBOZ3NPTSUbuimj,10WKlp1bjWxC1IWbpX4Q6l,5USAMqcbMAzF3HBmeD5pJF|169984",
  song: "song/vinny-marchi-jenny-of-oldstones",
  carriedBy: [
    {
      release: "release/vinny-marchi-jenny-of-oldstones",
      discNumber: 1,
      position: 1,
      externalId: "7eWuRDPxGwMvBjAUBjSDiY",
      externalLink: "https://open.spotify.com/track/7eWuRDPxGwMvBjAUBjSDiY",
    },
  ],
} as const satisfies Track
