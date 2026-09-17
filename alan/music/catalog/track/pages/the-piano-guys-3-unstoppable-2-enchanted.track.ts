import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2Enchanted = {
  id: "01a0afa1-da82-766d-bd3b-5c7b444fb444",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-enchanted",
  ownLength: 4.9833,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DxQeLfb2xKynvproGlLwy",
      externalLink: "https://open.spotify.com/track/1DxQeLfb2xKynvproGlLwy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Enchanted",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "enchanted|0jW6R8CVyVohuUJVcuweDI|298998",
} as const satisfies Track
