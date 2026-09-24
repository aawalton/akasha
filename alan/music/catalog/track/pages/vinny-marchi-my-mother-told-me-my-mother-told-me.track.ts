import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMyMotherToldMeMyMotherToldMe = {
  id: "01a0b112-9908-79c5-9369-1f9453c79153",
  type: "page-type/track",
  slug: "vinny-marchi-my-mother-told-me-my-mother-told-me",
  ownLength: 2.369866666666667,
  ownProgress: 2.369866666666667,
  partOfCollections: ["release/vinny-marchi-my-mother-told-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Mother Told Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "mymothertoldme|5USAMqcbMAzF3HBmeD5pJF|142192",
  song: "song/vinny-marchi-my-mother-told-me",
  carriedBy: [
    {
      release: "release/vinny-marchi-my-mother-told-me",
      discNumber: 1,
      position: 1,
      externalId: "3Y4nQSWnC0U9Sin2ZQ5Fbx",
      externalLink: "https://open.spotify.com/track/3Y4nQSWnC0U9Sin2ZQ5Fbx",
    },
  ],
} as const satisfies Track
