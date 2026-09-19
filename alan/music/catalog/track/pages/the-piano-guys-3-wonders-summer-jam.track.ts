import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersSummerJam = {
  id: "01a0afa2-1638-7fec-ba8c-de6e091e31de",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-summer-jam",
  ownLength: 3.8971,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wufP2zVjNLB1UimwehCEt",
      externalLink: "https://open.spotify.com/track/6wufP2zVjNLB1UimwehCEt",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Summer Jam",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "summerjam|0jW6R8CVyVohuUJVcuweDI|233826",
  song: "song/the-piano-guys-summer-jam",
} as const satisfies Track
