import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysBeethovens5Secrets = {
  id: "01a0afa2-1909-7bd3-add6-09a3da068b6d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-beethovens-5-secrets",
  ownLength: 5.16305,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xPQY7skgsujvvVyoE5lBi",
      externalLink: "https://open.spotify.com/track/7xPQY7skgsujvvVyoE5lBi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Beethoven's 5 Secrets",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    {
      externalId: "3ewlE33E3BBy5izrlsaR0G",
      artistName: "Lyceum Philharmonic at American Heritage School",
    },
    { externalId: "6k7qMS96A3GiN8ZvZgo3u6", artistName: "Julie Ann Nelson" },
    { externalId: "0rUC7g0r3Q9pfNeeVioxzC", artistName: "John Nelson" },
  ],
  trackKey:
    "beethovens5secrets|0jW6R8CVyVohuUJVcuweDI,0rUC7g0r3Q9pfNeeVioxzC,3ewlE33E3BBy5izrlsaR0G,6k7qMS96A3GiN8ZvZgo3u6|309783",
  song: "song/the-piano-guys-beethovens-5-secrets",
} as const satisfies Track
