import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiWhenMemoriesSnow = {
  id: "019f0ea0-2f91-70ae-9149-8e6ca7175251",
  type: "page-type/song",
  slug: "mitski-when-memories-snow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "49bda7f1-52af-47fd-9236-09d16fad6574",
      externalLink: "https://musicbrainz.org/work/49bda7f1-52af-47fd-9236-09d16fad6574",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When Memories Snow",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:26:46.801Z",
  updatedAt: "2026-09-19T17:05:22.000Z",
} as const satisfies Song
