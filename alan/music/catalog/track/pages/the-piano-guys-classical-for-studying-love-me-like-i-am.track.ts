import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingLoveMeLikeIAm = {
  id: "01a0afa1-ca2d-758f-a98a-641132207577",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-love-me-like-i-am",
  ownLength: 4.5694333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VdYc4CO8q9deMtf1SOjjW",
      externalLink: "https://open.spotify.com/track/6VdYc4CO8q9deMtf1SOjjW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Love Me Like I Am",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lovemelikeiam|0jW6R8CVyVohuUJVcuweDI|274166",
  song: "song/the-piano-guys-love-me-like-i-am",
} as const satisfies Track
