import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleBushwickBelle = {
  id: "01a0b112-8f07-72e5-810f-ed71465e8c1b",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-bushwick-belle",
  ownLength: 3.40475,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bushwick Belle",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "bushwickbelle|5USAMqcbMAzF3HBmeD5pJF|204285",
  song: "song/vinny-marchi-bushwick-belle",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 4,
      externalId: "6ewCnzZGuip2nh2qTFgLl3",
      externalLink: "https://open.spotify.com/track/6ewCnzZGuip2nh2qTFgLl3",
    },
  ],
} as const satisfies Track
