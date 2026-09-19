import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIrvineChivas = {
  id: "019ea4b0-f7cc-7d1a-a426-7f654b37a55f",
  type: "page-type/song",
  slug: "kelly-clarkson-irvine-chivas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f28853ee-a249-42d6-9657-11ad05d7758e",
      externalLink: "https://musicbrainz.org/work/f28853ee-a249-42d6-9657-11ad05d7758e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Irvine / Chivas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
