import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3InTheStarsAChangeInTheAir = {
  id: "01a0afa1-eff8-779f-8680-4d56fc3bcd2d",
  type: "page-type/track",
  slug: "the-piano-guys-3-in-the-stars-a-change-in-the-air",
  ownLength: 5.239983333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-in-the-stars"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "476YzQrMpOy4NmHGCuTDZ3",
      externalLink: "https://open.spotify.com/track/476YzQrMpOy4NmHGCuTDZ3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Change In The Air",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "achangeintheair|0jW6R8CVyVohuUJVcuweDI|314399",
  song: "song/the-piano-guys-a-change-in-the-air",
} as const satisfies Track
