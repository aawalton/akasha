import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoUnsungHero = {
  id: "01a0afa1-cb02-74a3-9416-8510e7c7a064",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-unsung-hero",
  ownLength: 3.7426666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6CtAa6dZ3XxT8FALHW4kEk",
      externalLink: "https://open.spotify.com/track/6CtAa6dZ3XxT8FALHW4kEk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unsung Hero",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unsunghero|0jW6R8CVyVohuUJVcuweDI|224560",
  song: "song/the-piano-guys-unsung-hero",
} as const satisfies Track
