import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynRhymeOrReasonRhymeOrReason = {
  id: "01a0b9ec-9641-7126-9fe7-6e240d81ae22",
  type: "page-type/track",
  slug: "chaislyn-rhyme-or-reason-rhyme-or-reason",
  ownLength: 4.190216666666666,
  ownProgress: 4.190216666666666,
  partOfCollections: ["release/chaislyn-rhyme-or-reason"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NTYphxIdN60YEL8XPomHo",
      externalLink: "https://open.spotify.com/track/6NTYphxIdN60YEL8XPomHo",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "rhyme or reason",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "rhymeorreason|3zmbniiciaBAJlSX1Bzq9R|251413",
  song: "song/chaislyn-rhyme-or-reason",
  carriedBy: [
    {
      release: "release/chaislyn-rhyme-or-reason",
      discNumber: 1,
      position: 1,
      externalId: "6NTYphxIdN60YEL8XPomHo",
      externalLink: "https://open.spotify.com/track/6NTYphxIdN60YEL8XPomHo",
    },
  ],
} as const satisfies Track
