import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterTheBastardInTheKitchen = {
  id: "01a0b112-918c-77df-b300-3948c6b1f6dd",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-the-bastard-in-the-kitchen",
  ownLength: 1.8903833333333333,
  ownProgress: 1.8903833333333333,
  partOfCollections: [
    "release/vinny-marchi-tales-of-the-lesbian-hunter",
    "release/vinny-marchi-the-bastard-in-the-kitchen",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Bastard in the Kitchen",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "thebastardinthekitchen|5USAMqcbMAzF3HBmeD5pJF|113423",
  song: "song/vinny-marchi-the-bastard-in-the-kitchen",
  carriedBy: [
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 5,
      externalId: "144U5cAZUYgDELPZWQ5ql1",
      externalLink: "https://open.spotify.com/track/144U5cAZUYgDELPZWQ5ql1",
    },
    {
      release: "release/vinny-marchi-the-bastard-in-the-kitchen",
      discNumber: 1,
      position: 1,
      externalId: "1MCJ6nr7QZOQ6ICsc34Ewq",
      externalLink: "https://open.spotify.com/track/1MCJ6nr7QZOQ6ICsc34Ewq",
    },
  ],
} as const satisfies Track
