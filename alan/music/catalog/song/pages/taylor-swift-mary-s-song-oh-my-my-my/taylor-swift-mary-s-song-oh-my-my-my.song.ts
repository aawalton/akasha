import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMarySSongOhMyMyMy = {
  id: "019ea416-1a00-7676-a32c-c9c1ac909232",
  type: "page-type/song",
  slug: "taylor-swift-mary-s-song-oh-my-my-my",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "123c3c0f-cced-4f8c-ba50-ce8700e53345",
      externalLink: "https://musicbrainz.org/work/123c3c0f-cced-4f8c-ba50-ce8700e53345",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mary’s Song (Oh My My My)",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
