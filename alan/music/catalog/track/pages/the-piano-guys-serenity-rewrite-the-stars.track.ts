import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityRewriteTheStars = {
  id: "01a0afa2-08b0-7d63-8abb-1074a8db3845",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-rewrite-the-stars",
  ownLength: 3.52555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wliVjxGl2X28AQ6h1udXW",
      externalLink: "https://open.spotify.com/track/3wliVjxGl2X28AQ6h1udXW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rewrite the Stars",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rewritethestars|0jW6R8CVyVohuUJVcuweDI|211533",
  song: "song/the-piano-guys-rewrite-the-stars",
} as const satisfies Track
