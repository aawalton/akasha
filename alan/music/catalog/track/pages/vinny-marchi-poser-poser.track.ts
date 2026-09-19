import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiPoserPoser = {
  id: "01a0b112-9a52-7baa-8aa0-d095f5096ae9",
  type: "page-type/track",
  slug: "vinny-marchi-poser-poser",
  ownLength: 2.7301333333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-poser"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YAVYFHT3DPMpYK326yat3",
      externalLink: "https://open.spotify.com/track/3YAVYFHT3DPMpYK326yat3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "POSER",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "poser|5USAMqcbMAzF3HBmeD5pJF|163808",
  song: "song/vinny-marchi-poser",
} as const satisfies Track
