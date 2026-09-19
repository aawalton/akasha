import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveSummerJamIntroductionLive = {
  id: "01a0afa2-13bb-7048-aec0-b06dc802c956",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-summer-jam-introduction-live",
  ownLength: 0.40176666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5QCZC9ZIf2mJ05YL3PP0ia",
      externalLink: "https://open.spotify.com/track/5QCZC9ZIf2mJ05YL3PP0ia",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Summer Jam (Introduction) - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "summerjamintroductionlive|0jW6R8CVyVohuUJVcuweDI|24106",
  song: "song/the-piano-guys-summer-jam-introduction",
} as const satisfies Track
