import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPictureToBurn = {
  id: "019ea416-4220-7363-ba25-a8e40f30feb0",
  type: "page-type/song",
  slug: "taylor-swift-picture-to-burn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f5b65b2b-9cab-45f8-bff8-768160b5d9ed",
      externalLink: "https://musicbrainz.org/work/f5b65b2b-9cab-45f8-bff8-768160b5d9ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Picture to Burn",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
