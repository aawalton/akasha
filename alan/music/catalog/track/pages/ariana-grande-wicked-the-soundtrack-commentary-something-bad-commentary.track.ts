import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackCommentarySomethingBadCommentary = {
  id: "01a0a6c5-49d6-74fc-b1bf-7ffe8ced6298",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-commentary-something-bad-commentary",
  ownLength: 1.3343833333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack-commentary"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09eGSrwzYs7GOgHlrjilvW",
      externalLink: "https://open.spotify.com/track/09eGSrwzYs7GOgHlrjilvW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Something Bad - Commentary",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2NqTD8XByzWPCUQQmza0xP", artistName: "Jon Chu" },
    { externalId: "0pHTIdyC4DAsoMhpSufQaz", artistName: "Peter Dinklage" },
  ],
  trackKey: "somethingbadcommentary|0pHTIdyC4DAsoMhpSufQaz,2NqTD8XByzWPCUQQmza0xP|80063",
  song: "song/ariana-grande-something-bad-commentary",
} as const satisfies Track
