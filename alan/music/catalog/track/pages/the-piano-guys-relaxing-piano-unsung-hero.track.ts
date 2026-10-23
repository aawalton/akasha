import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoUnsungHero = {
  id: "01a0afa1-cb02-74a3-9416-8510e7c7a064",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-unsung-hero",
  ownLength: 3.7426666666666666,
  ownProgress: 3.7426666666666666,
  partOfCollections: [
    "release/the-piano-guys-relaxing-piano",
    "release/the-piano-guys-3-unsung-hero",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Unsung Hero",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "unsunghero|0jW6R8CVyVohuUJVcuweDI|224560",
  song: "song/the-piano-guys-unsung-hero",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-unsung-hero",
      discNumber: 1,
      position: 1,
      externalId: "2ldkfdLbMh8BSncVjkH2z8",
      externalLink: "https://open.spotify.com/track/2ldkfdLbMh8BSncVjkH2z8",
    },
    {
      release: "release/the-piano-guys-relaxing-piano",
      discNumber: 1,
      position: 6,
      externalId: "6CtAa6dZ3XxT8FALHW4kEk",
      externalLink: "https://open.spotify.com/track/6CtAa6dZ3XxT8FALHW4kEk",
    },
  ],
  createdAt: "2026-09-17T13:50:11.202Z",
  updatedAt: "2026-10-23T14:00:48.915Z",
  progressedAt: "2026-10-23T14:00:48.915Z",
} as const satisfies Track
