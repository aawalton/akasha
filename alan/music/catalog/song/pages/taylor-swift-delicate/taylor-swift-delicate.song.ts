import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDelicate = {
  id: "019ea416-0777-7289-a1ef-136aa486efd0",
  type: "page-type/song",
  slug: "taylor-swift-delicate",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "441d26a3-c413-49b5-8cd6-18afd921eb41",
      externalLink: "https://musicbrainz.org/work/441d26a3-c413-49b5-8cd6-18afd921eb41",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Delicate",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
