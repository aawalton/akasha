import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIDonTLikeMyself = {
  id: "019ea499-881e-7fc4-90db-8875427bd228",
  type: "page-type/song",
  slug: "imagine-dragons-i-don-t-like-myself",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90da0869-6d11-42b2-b94d-faba9e5ef1d4",
      externalLink: "https://musicbrainz.org/work/90da0869-6d11-42b2-b94d-faba9e5ef1d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Like Myself",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
