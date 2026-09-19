import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiCherryWineCherryWine = {
  id: "01a0b112-9783-70d4-bdc7-29231ff303bf",
  type: "page-type/track",
  slug: "vinny-marchi-cherry-wine-cherry-wine",
  ownLength: 3.4964,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-cherry-wine"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ElnQSxqO4p88afe629nbK",
      externalLink: "https://open.spotify.com/track/6ElnQSxqO4p88afe629nbK",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Cherry Wine",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "cherrywine|5USAMqcbMAzF3HBmeD5pJF|209784",
  song: "song/vinny-marchi-cherry-wine",
} as const satisfies Track
