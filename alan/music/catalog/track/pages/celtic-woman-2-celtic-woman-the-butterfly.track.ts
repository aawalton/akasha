import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanTheButterfly = {
  id: "01a0abea-79ab-7ddc-8f8d-8e143f1813cf",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-the-butterfly",
  ownLength: 3.0037666666666665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Doqw5c9ilLdxIVbGIPW9k",
      externalLink: "https://open.spotify.com/track/1Doqw5c9ilLdxIVbGIPW9k",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Butterfly",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thebutterfly|6NWtt9pNOL2Gx7kBykdE5x|180226",
  song: "song/celtic-woman-the-butterfly",
} as const satisfies Track
