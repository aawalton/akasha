import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBiggerThanTheWholeSky = {
  id: "019ea416-049d-7128-84ec-d9ac056475be",
  type: "page-type/song",
  slug: "taylor-swift-bigger-than-the-whole-sky",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "25e67d46-02f7-4a24-b27e-48d5048fd20d",
      externalLink: "https://musicbrainz.org/work/25e67d46-02f7-4a24-b27e-48d5048fd20d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bigger Than the Whole Sky",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
