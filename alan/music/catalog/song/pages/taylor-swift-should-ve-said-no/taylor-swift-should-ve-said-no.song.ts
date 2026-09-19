import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftShouldVeSaidNo = {
  id: "019ea416-3d8a-7dc5-bac2-8cc0702f1065",
  type: "page-type/song",
  slug: "taylor-swift-should-ve-said-no",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d45231e1-49b5-4684-b7d8-e304b15982f7",
      externalLink: "https://musicbrainz.org/work/d45231e1-49b5-4684-b7d8-e304b15982f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Should’ve Said No",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
