import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdScaredOfTheDark = {
  id: "019ea4df-08f7-7941-a95e-75f01dfbfaa0",
  type: "page-type/song",
  slug: "em-beihold-scared-of-the-dark",
  title: "Scared of the Dark",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13ec609d-5d2f-4de5-b3f9-612f0a345bc8",
      externalLink: "https://musicbrainz.org/work/13ec609d-5d2f-4de5-b3f9-612f0a345bc8",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
