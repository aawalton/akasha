import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiCherryWineCherryWine = {
  id: "01a0b112-9783-70d4-bdc7-29231ff303bf",
  type: "page-type/track",
  slug: "vinny-marchi-cherry-wine-cherry-wine",
  ownLength: 3.4964,
  ownProgress: 3.4964,
  partOfCollections: ["release/vinny-marchi-cherry-wine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cherry Wine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "cherrywine|5USAMqcbMAzF3HBmeD5pJF|209784",
  song: "song/vinny-marchi-cherry-wine",
  carriedBy: [
    {
      release: "release/vinny-marchi-cherry-wine",
      discNumber: 1,
      position: 1,
      externalId: "6ElnQSxqO4p88afe629nbK",
      externalLink: "https://open.spotify.com/track/6ElnQSxqO4p88afe629nbK",
    },
  ],
} as const satisfies Track
