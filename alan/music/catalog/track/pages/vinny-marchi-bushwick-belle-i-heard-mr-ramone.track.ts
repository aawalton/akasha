import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleIHeardMrRamone = {
  id: "01a0b112-8f2c-70c8-8370-e560efb41da5",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-i-heard-mr-ramone",
  ownLength: 3.5170833333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Heard Mr. Ramone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "iheardmrramone|5USAMqcbMAzF3HBmeD5pJF|211025",
  song: "song/vinny-marchi-i-heard-mr-ramone",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 5,
      externalId: "69ovIJT5vlgHuG33UWWfiB",
      externalLink: "https://open.spotify.com/track/69ovIJT5vlgHuG33UWWfiB",
    },
  ],
} as const satisfies Track
