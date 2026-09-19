import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBewareOfTheSirenBewareOfTheSiren = {
  id: "01a0b112-95f4-729f-996a-53c347721e59",
  type: "page-type/track",
  slug: "vinny-marchi-beware-of-the-siren-beware-of-the-siren",
  ownLength: 2.9468666666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-beware-of-the-siren"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HzuoKEBuADqZAHaYmegqZ",
      externalLink: "https://open.spotify.com/track/4HzuoKEBuADqZAHaYmegqZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Beware of the Siren",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "bewareofthesiren|5USAMqcbMAzF3HBmeD5pJF|176812",
  song: "song/vinny-marchi-beware-of-the-siren",
} as const satisfies Track
