import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationGethsemane = {
  id: "01a0b4c8-3671-7d08-b50f-ee807c21da73",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-gethsemane",
  ownLength: 3.5733333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "067fdHLUlMJYn9gav9gExG",
      externalLink: "https://open.spotify.com/track/067fdHLUlMJYn9gav9gExG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gethsemane",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "6WfsgevyXjoFI4tT5ghvhV", artistName: "Nathan Pacheco" },
  ],
  trackKey: "gethsemane|6WfsgevyXjoFI4tT5ghvhV,7FQRbf8gbKw8KZQZAJWxH2|214400",
  song: "song/paul-cardall-gethsemane",
} as const satisfies Track
