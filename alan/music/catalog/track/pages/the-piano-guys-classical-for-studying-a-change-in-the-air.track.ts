import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingAChangeInTheAir = {
  id: "01a0afa1-c9b0-7d28-869c-e5c703819514",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-a-change-in-the-air",
  ownLength: 5.239983333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4D4pmUChcjxPJ0PPbYhjZw",
      externalLink: "https://open.spotify.com/track/4D4pmUChcjxPJ0PPbYhjZw",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Change In The Air",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "achangeintheair|0jW6R8CVyVohuUJVcuweDI|314399",
  song: "song/the-piano-guys-a-change-in-the-air",
} as const satisfies Track
