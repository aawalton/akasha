import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftForeverAlways = {
  id: "019ea416-1ddf-7421-ae69-caaec616ca50",
  type: "page-type/song",
  slug: "taylor-swift-forever-always",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "440c59c7-e41d-3fc8-9877-c814cb5d876a",
      externalLink: "https://musicbrainz.org/work/440c59c7-e41d-3fc8-9877-c814cb5d876a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Forever & Always",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
