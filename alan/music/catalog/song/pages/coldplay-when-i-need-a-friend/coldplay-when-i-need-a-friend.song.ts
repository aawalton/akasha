import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWhenINeedAFriend = {
  id: "01a0ba60-f55d-7672-88d2-278492dc9710",
  type: "page-type/song",
  slug: "coldplay-when-i-need-a-friend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "92c10f39-20d3-4119-9f58-bd00ae6e6a2b",
      externalLink: "https://musicbrainz.org/work/92c10f39-20d3-4119-9f58-bd00ae6e6a2b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When I Need a Friend",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T15:55:11.581Z",
  updatedAt: "2026-09-19T16:18:26.000Z",
} as const satisfies Song
