import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWillYouLoveMeTomorrow = {
  id: "01a0b72f-4e43-7883-9b90-fda658246644",
  type: "page-type/song",
  slug: "james-taylor-will-you-love-me-tomorrow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "78bf38b7-9a4b-356b-ac17-ca5c77d6c9ee",
      externalLink: "https://musicbrainz.org/work/78bf38b7-9a4b-356b-ac17-ca5c77d6c9ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Will You Love Me Tomorrow",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
