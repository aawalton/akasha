import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AThousandYears = {
  id: "01a0afa2-0d60-7bb2-86f2-62c9877676ed",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-a-thousand-years",
  ownLength: 4.50735,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1n3X12SV936VFhCzASRJQj",
      externalLink: "https://open.spotify.com/track/1n3X12SV936VFhCzASRJQj",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Thousand Years",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|270441",
  song: "song/evynne-hollens-a-thousand-years",
} as const satisfies Track
