import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalMovieSoundtracksRewriteTheStars = {
  id: "01a0afa1-d4b0-7017-a4ff-41eacf2dfc16",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-movie-soundtracks-rewrite-the-stars",
  ownLength: 3.504,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-movie-soundtracks"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3CLNIC8J4ThMSpbpuHoaHV",
      externalLink: "https://open.spotify.com/track/3CLNIC8J4ThMSpbpuHoaHV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rewrite The Stars",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rewritethestars|0jW6R8CVyVohuUJVcuweDI|210240",
  song: "song/the-piano-guys-rewrite-the-stars",
} as const satisfies Track
