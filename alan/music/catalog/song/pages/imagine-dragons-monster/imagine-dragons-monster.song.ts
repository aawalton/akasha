import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMonster = {
  id: "019ea498-803a-7b01-a1c4-5f3bac269a27",
  type: "page-type/song",
  slug: "imagine-dragons-monster",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5baec07c-9eba-4f48-a2e0-5fb81d837a1b",
      externalLink: "https://musicbrainz.org/work/5baec07c-9eba-4f48-a2e0-5fb81d837a1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Monster",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
