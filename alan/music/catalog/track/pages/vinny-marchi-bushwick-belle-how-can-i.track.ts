import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleHowCanI = {
  id: "01a0b112-8e9c-7b25-a72f-3f54656fced4",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-how-can-i",
  ownLength: 3.62075,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  status: "not-started",
  unit: "unit/minutes",
  title: "How Can I",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "howcani|5USAMqcbMAzF3HBmeD5pJF|217245",
  song: "song/vinny-marchi-how-can-i",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 1,
      externalId: "1S0hRMjVT6DX9xJEvBF66x",
      externalLink: "https://open.spotify.com/track/1S0hRMjVT6DX9xJEvBF66x",
    },
  ],
} as const satisfies Track
