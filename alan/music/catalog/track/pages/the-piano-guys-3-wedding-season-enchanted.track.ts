import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonEnchanted = {
  id: "01a0afa1-d6a5-764f-bdba-5c32e6b40724",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-enchanted",
  ownLength: 4.9833,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ebSD5WA1KozEeOxGTMWEr",
      externalLink: "https://open.spotify.com/track/3ebSD5WA1KozEeOxGTMWEr",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Enchanted",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "enchanted|0jW6R8CVyVohuUJVcuweDI|298998",
} as const satisfies Track
