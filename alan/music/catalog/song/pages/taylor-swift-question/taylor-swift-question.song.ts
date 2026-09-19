import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftQuestion = {
  id: "019ea416-34ba-70bd-bb47-110f7a9ea892",
  type: "page-type/song",
  slug: "taylor-swift-question",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5a5bef29-1511-4f50-9681-45464830c905",
      externalLink: "https://musicbrainz.org/work/5a5bef29-1511-4f50-9681-45464830c905",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Question…?",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
