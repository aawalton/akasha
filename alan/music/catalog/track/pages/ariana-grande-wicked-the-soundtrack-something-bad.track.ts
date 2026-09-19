import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackSomethingBad = {
  id: "01a0a6c5-4c69-7b13-b1ec-1d25f55026a4",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-something-bad",
  ownLength: 1.805,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hHr31QnEybBSpH8G4yJji",
      externalLink: "https://open.spotify.com/track/6hHr31QnEybBSpH8G4yJji",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Something Bad",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0pHTIdyC4DAsoMhpSufQaz", artistName: "Peter Dinklage" },
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
  ],
  trackKey: "somethingbad|0pHTIdyC4DAsoMhpSufQaz,46UMQ0cW8ToR8egkBRwAxZ|108300",
  song: "song/ariana-grande-something-bad",
} as const satisfies Track
