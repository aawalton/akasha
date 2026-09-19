import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEnchanted = {
  id: "019ea416-0911-7478-bd4f-85dfb1fe486d",
  type: "page-type/song",
  slug: "taylor-swift-enchanted",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5569eb48-0821-3d57-ab3b-80f63d3d37e4",
      externalLink: "https://musicbrainz.org/work/5569eb48-0821-3d57-ab3b-80f63d3d37e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Enchanted",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
