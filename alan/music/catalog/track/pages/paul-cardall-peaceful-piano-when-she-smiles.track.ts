import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoWhenSheSmiles = {
  id: "01a0b4c8-3381-77e1-b8d6-14f2d483bed0",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-when-she-smiles",
  ownLength: 4.0271,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4m81aURCinsOqQ7ggkp43g",
      externalLink: "https://open.spotify.com/track/4m81aURCinsOqQ7ggkp43g",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "When She Smiles",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whenshesmiles|7FQRbf8gbKw8KZQZAJWxH2|241626",
  song: "song/paul-cardall-when-she-smiles",
} as const satisfies Track
