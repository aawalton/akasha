import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTheDragonbornComesTheDragonbornComes = {
  id: "01a0b112-9836-7465-ad1d-89535cb5f370",
  type: "page-type/track",
  slug: "vinny-marchi-the-dragonborn-comes-the-dragonborn-comes",
  ownLength: 3.4724333333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-the-dragonborn-comes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0iYSkRJhBwOuaBo5Ie7mNt",
      externalLink: "https://open.spotify.com/track/0iYSkRJhBwOuaBo5Ie7mNt",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Dragonborn Comes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "thedragonborncomes|5USAMqcbMAzF3HBmeD5pJF|208346",
  song: "song/vinny-marchi-the-dragonborn-comes",
} as const satisfies Track
