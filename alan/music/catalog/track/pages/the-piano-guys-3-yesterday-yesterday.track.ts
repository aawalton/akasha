import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3YesterdayYesterday = {
  id: "01a0afa2-1d95-7580-a8c3-072f55cd4c43",
  type: "page-type/track",
  slug: "the-piano-guys-3-yesterday-yesterday",
  ownLength: 3.4718666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-yesterday"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JLEnOgHaQD2yXkoI6iu65",
      externalLink: "https://open.spotify.com/track/4JLEnOgHaQD2yXkoI6iu65",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Yesterday",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "yesterday|0jW6R8CVyVohuUJVcuweDI|208312",
  song: "song/the-piano-guys-yesterday",
} as const satisfies Track
