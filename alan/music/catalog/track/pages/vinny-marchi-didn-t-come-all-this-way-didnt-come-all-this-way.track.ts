import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiDidnTComeAllThisWayDidntComeAllThisWay = {
  id: "01a0b112-954e-7522-a60e-7399864f2e7c",
  type: "page-type/track",
  slug: "vinny-marchi-didn-t-come-all-this-way-didnt-come-all-this-way",
  ownLength: 2.5641,
  ownProgress: 2.5641,
  partOfCollections: [
    "release/vinny-marchi-didn-t-come-all-this-way",
    "release/vinny-marchi-tales-of-the-lesbian-hunter",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Didn't Come All This Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "didntcomeallthisway|5USAMqcbMAzF3HBmeD5pJF|153846",
  song: "song/vinny-marchi-didnt-come-all-this-way",
  carriedBy: [
    {
      release: "release/vinny-marchi-didn-t-come-all-this-way",
      discNumber: 1,
      position: 1,
      externalId: "3YKqgzI9qKZDpzUoptGANJ",
      externalLink: "https://open.spotify.com/track/3YKqgzI9qKZDpzUoptGANJ",
    },
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 10,
      externalId: "4CoIGoKauG5COr0s5LKccj",
      externalLink: "https://open.spotify.com/track/4CoIGoKauG5COr0s5LKccj",
    },
  ],
} as const satisfies Track
