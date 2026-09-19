import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingNessunDorma = {
  id: "01a0afa1-c85c-735b-b317-626585800f9c",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-nessun-dorma",
  ownLength: 2.4590833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KVkNZ0lbDYYqJFTUokrdI",
      externalLink: "https://open.spotify.com/track/6KVkNZ0lbDYYqJFTUokrdI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Nessun Dorma",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nessundorma|0jW6R8CVyVohuUJVcuweDI|147545",
  song: "song/the-piano-guys-nessun-dorma",
} as const satisfies Track
