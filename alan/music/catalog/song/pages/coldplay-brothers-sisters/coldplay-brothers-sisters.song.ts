import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBrothersSisters = {
  id: "01a0ba5d-415e-7515-9ec4-bdb2c396ccf3",
  type: "page-type/song",
  slug: "coldplay-brothers-sisters",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8e7f1d56-dd5a-38cb-88aa-f972b3f3ae94",
      externalLink: "https://musicbrainz.org/work/8e7f1d56-dd5a-38cb-88aa-f972b3f3ae94",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brothers & Sisters",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
