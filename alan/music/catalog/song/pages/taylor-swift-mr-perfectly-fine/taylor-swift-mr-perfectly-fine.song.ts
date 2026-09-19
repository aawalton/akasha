import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMrPerfectlyFine = {
  id: "019ea416-4184-7a27-9340-97ba2e27ff04",
  type: "page-type/song",
  slug: "taylor-swift-mr-perfectly-fine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4bd40da-3b35-4126-9e6a-f95f38fd2fdb",
      externalLink: "https://musicbrainz.org/work/f4bd40da-3b35-4126-9e6a-f95f38fd2fdb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mr. Perfectly Fine",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
