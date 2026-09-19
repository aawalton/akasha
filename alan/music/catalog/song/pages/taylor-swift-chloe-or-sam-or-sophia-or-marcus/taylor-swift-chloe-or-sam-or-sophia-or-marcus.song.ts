import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChloeOrSamOrSophiaOrMarcus = {
  id: "019ea416-0ba3-7b21-b168-fb7e6d87d452",
  type: "page-type/song",
  slug: "taylor-swift-chloe-or-sam-or-sophia-or-marcus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "733f2a42-2023-4ed8-96d5-600250aa6c43",
      externalLink: "https://musicbrainz.org/work/733f2a42-2023-4ed8-96d5-600250aa6c43",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chloe or Sam or Sophia or Marcus",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
