import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBadLiar = {
  id: "019ea49a-5230-7a5f-ae38-79962b8c3377",
  type: "page-type/song",
  slug: "imagine-dragons-bad-liar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0031714-21fa-4529-aaaf-fafbd8c887ba",
      externalLink: "https://musicbrainz.org/work/c0031714-21fa-4529-aaaf-fafbd8c887ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Liar",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
