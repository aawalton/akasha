import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMyHeartWillGoOn = {
  id: "01a0b720-0ee3-7037-9f75-e2077ceea039",
  type: "page-type/song",
  slug: "celtic-woman-my-heart-will-go-on",
  partOfCollections: ["artist/zara-larsson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "78fc1f10-cbbf-3603-8c07-99a3d4f81397",
      externalLink: "https://musicbrainz.org/work/78fc1f10-cbbf-3603-8c07-99a3d4f81397",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Heart Will Go On",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
