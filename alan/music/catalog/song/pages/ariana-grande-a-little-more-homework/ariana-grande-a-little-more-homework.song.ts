import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeALittleMoreHomework = {
  id: "019ea4e1-599c-7dba-ac97-7cbb36c19f21",
  type: "page-type/song",
  slug: "ariana-grande-a-little-more-homework",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "56884741-604d-4b31-8caf-b096b095ae68",
      externalLink: "https://musicbrainz.org/work/56884741-604d-4b31-8caf-b096b095ae68",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Little More Homework",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
