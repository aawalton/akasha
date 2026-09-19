import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LoveMeLikeIAmLoveMeLikeIAm = {
  id: "01a0afa1-f32b-7d14-bd17-616ae2c7558b",
  type: "page-type/track",
  slug: "the-piano-guys-3-love-me-like-i-am-love-me-like-i-am",
  ownLength: 4.5694333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-love-me-like-i-am"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tgo1cmqBUgQs878IKdjXr",
      externalLink: "https://open.spotify.com/track/0tgo1cmqBUgQs878IKdjXr",
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
