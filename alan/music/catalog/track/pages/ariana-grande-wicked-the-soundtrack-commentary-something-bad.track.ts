import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackCommentarySomethingBad = {
  id: "01a0a6c5-49f5-72c6-93f1-a330f81af7d7",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-commentary-something-bad",
  ownLength: 1.805,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack-commentary"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KwGGUydPNh0h5V5Zy6OBB",
      externalLink: "https://open.spotify.com/track/7KwGGUydPNh0h5V5Zy6OBB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Something Bad",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0pHTIdyC4DAsoMhpSufQaz", artistName: "Peter Dinklage" },
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
  ],
  trackKey: "somethingbad|0pHTIdyC4DAsoMhpSufQaz,46UMQ0cW8ToR8egkBRwAxZ|108300",
  song: "song/ariana-grande-something-bad",
} as const satisfies Track
