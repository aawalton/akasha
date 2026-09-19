import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalLoveRomancePerfect = {
  id: "01a0afa1-d1cd-71fe-8336-7ee74aedb3db",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-love-romance-perfect",
  ownLength: 5.141666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-love-romance"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29gW8p46nOvvkphl6AXamd",
      externalLink: "https://open.spotify.com/track/29gW8p46nOvvkphl6AXamd",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Perfect",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|308500",
  song: "song/the-piano-guys-perfect",
} as const satisfies Track
