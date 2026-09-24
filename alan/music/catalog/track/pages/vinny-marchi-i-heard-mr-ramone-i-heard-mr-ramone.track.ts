import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiIHeardMrRamoneIHeardMrRamone = {
  id: "01a0b112-94aa-72e3-a8e9-7ede2cf5da16",
  type: "page-type/track",
  slug: "vinny-marchi-i-heard-mr-ramone-i-heard-mr-ramone",
  ownLength: 3.50075,
  ownProgress: 3.50075,
  partOfCollections: ["release/vinny-marchi-i-heard-mr-ramone"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Heard Mr. Ramone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "iheardmrramone|5USAMqcbMAzF3HBmeD5pJF|210045",
  song: "song/vinny-marchi-i-heard-mr-ramone",
  carriedBy: [
    {
      release: "release/vinny-marchi-i-heard-mr-ramone",
      discNumber: 1,
      position: 1,
      externalId: "34AuDzMwxmKQmiE9Hm49sX",
      externalLink: "https://open.spotify.com/track/34AuDzMwxmKQmiE9Hm49sX",
    },
  ],
} as const satisfies Track
