import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoLoveMeLikeIAm = {
  id: "01a0afa1-caae-7e7a-bbf8-b13d486abea2",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-love-me-like-i-am",
  ownLength: 4.5694333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lvhurLHOmCWQvDvJP8EAc",
      externalLink: "https://open.spotify.com/track/0lvhurLHOmCWQvDvJP8EAc",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Love Me Like I Am",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lovemelikeiam|0jW6R8CVyVohuUJVcuweDI|274166",
  song: "song/the-piano-guys-love-me-like-i-am",
} as const satisfies Track
