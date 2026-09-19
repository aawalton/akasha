import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonLookWhatYouVeDone = {
  id: "019ea49e-6c69-7f54-8c55-d183fb319001",
  type: "page-type/song",
  slug: "zara-larsson-look-what-you-ve-done",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "21315a79-738c-4ef2-aa45-b3871d3aff22",
      externalLink: "https://musicbrainz.org/work/21315a79-738c-4ef2-aa45-b3871d3aff22",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Look What You’ve Done",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
