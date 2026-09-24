import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMissingMeMissingMe = {
  id: "01a0b112-9c16-7f3d-a2ce-6467899884ac",
  type: "page-type/track",
  slug: "vinny-marchi-missing-me-missing-me",
  ownLength: 3.308666666666667,
  ownProgress: 3.308666666666667,
  partOfCollections: ["release/vinny-marchi-missing-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "missing me.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "missingme|5USAMqcbMAzF3HBmeD5pJF|198520",
  song: "song/vinny-marchi-missing-me",
  carriedBy: [
    {
      release: "release/vinny-marchi-missing-me",
      discNumber: 1,
      position: 1,
      externalId: "4SVHyFLX8rWfmW8nnUzymu",
      externalLink: "https://open.spotify.com/track/4SVHyFLX8rWfmW8nnUzymu",
    },
  ],
} as const satisfies Track
