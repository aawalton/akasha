import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonUnderTheMistletoe = {
  id: "019ea4b2-ca5d-73b4-892c-0d9b6d35894b",
  type: "page-type/song",
  slug: "kelly-clarkson-under-the-mistletoe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7bff8872-0736-45ab-a8b2-c354e7f6a679",
      externalLink: "https://musicbrainz.org/work/7bff8872-0736-45ab-a8b2-c354e7f6a679",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Under the Mistletoe",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
