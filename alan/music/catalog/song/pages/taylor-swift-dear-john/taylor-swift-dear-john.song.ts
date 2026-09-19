import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDearJohn = {
  id: "019ea416-153d-7de7-a36d-3af8b7731b6e",
  type: "page-type/song",
  slug: "taylor-swift-dear-john",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c70e6295-12ed-39ca-b069-cd485920ac11",
      externalLink: "https://musicbrainz.org/work/c70e6295-12ed-39ca-b069-cd485920ac11",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dear John",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
