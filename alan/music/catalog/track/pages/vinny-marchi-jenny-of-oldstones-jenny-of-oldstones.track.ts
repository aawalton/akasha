import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiJennyOfOldstonesJennyOfOldstones = {
  id: "01a0b112-9020-7f97-b681-52708007120e",
  type: "page-type/track",
  slug: "vinny-marchi-jenny-of-oldstones-jenny-of-oldstones",
  ownLength: 2.833066666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-jenny-of-oldstones"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7eWuRDPxGwMvBjAUBjSDiY",
      externalLink: "https://open.spotify.com/track/7eWuRDPxGwMvBjAUBjSDiY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jenny Of Oldstones",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "10WKlp1bjWxC1IWbpX4Q6l", artistName: "Topher Ngo" },
    { externalId: "0ZM2ioGGBOZ3NPTSUbuimj", artistName: "Bobby Bass" },
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
  ],
  trackKey:
    "jennyofoldstones|0ZM2ioGGBOZ3NPTSUbuimj,10WKlp1bjWxC1IWbpX4Q6l,5USAMqcbMAzF3HBmeD5pJF|169984",
  song: "song/vinny-marchi-jenny-of-oldstones",
} as const satisfies Track
