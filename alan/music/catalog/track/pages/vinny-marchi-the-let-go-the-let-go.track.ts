import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTheLetGoTheLetGo = {
  id: "01a0b112-94d1-7ad9-bbae-ec7171c48980",
  type: "page-type/track",
  slug: "vinny-marchi-the-let-go-the-let-go",
  ownLength: 3.3539666666666665,
  ownProgress: 3.3539666666666665,
  partOfCollections: ["release/vinny-marchi-the-let-go"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Let Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "theletgo|5USAMqcbMAzF3HBmeD5pJF|201238",
  song: "song/vinny-marchi-the-let-go",
  carriedBy: [
    {
      release: "release/vinny-marchi-the-let-go",
      discNumber: 1,
      position: 1,
      externalId: "22DPaemXvTGdABSZNGu1Au",
      externalLink: "https://open.spotify.com/track/22DPaemXvTGdABSZNGu1Au",
    },
  ],
} as const satisfies Track
