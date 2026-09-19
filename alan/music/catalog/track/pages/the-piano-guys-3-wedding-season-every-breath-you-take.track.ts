import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonEveryBreathYouTake = {
  id: "01a0afa1-d824-7e00-9432-dd37c3b3a365",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-every-breath-you-take",
  ownLength: 4.536833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6dfeSWND2e74EMSJI2Ract",
      externalLink: "https://open.spotify.com/track/6dfeSWND2e74EMSJI2Ract",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Every Breath You Take",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "everybreathyoutake|0jW6R8CVyVohuUJVcuweDI|272210",
  song: "song/the-piano-guys-every-breath-you-take",
} as const satisfies Track
