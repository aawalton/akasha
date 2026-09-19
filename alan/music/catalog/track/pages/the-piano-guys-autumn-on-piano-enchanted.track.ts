import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoEnchanted = {
  id: "01a0afa1-c0aa-7b58-8d10-0d042aa72829",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-enchanted",
  ownLength: 4.9833,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4L73kXMdZ7OKydIpzXEnIc",
      externalLink: "https://open.spotify.com/track/4L73kXMdZ7OKydIpzXEnIc",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Enchanted",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "enchanted|0jW6R8CVyVohuUJVcuweDI|298998",
  song: "song/the-piano-guys-enchanted",
} as const satisfies Track
