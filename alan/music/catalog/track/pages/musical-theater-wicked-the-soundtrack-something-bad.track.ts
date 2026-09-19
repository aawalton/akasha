import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackSomethingBad = {
  id: "01a0a6c5-11fc-7d73-b780-176bd06131bf",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-something-bad",
  ownLength: 1.805,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5E2ASK5znLzoizBy4njhM4",
      externalLink: "https://open.spotify.com/track/5E2ASK5znLzoizBy4njhM4",
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
  song: "song/peter-dinklage-something-bad",
} as const satisfies Track
