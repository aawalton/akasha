import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChange = {
  id: "019ea416-17b6-74fb-a7b2-8a7497133f8b",
  type: "page-type/song",
  slug: "taylor-swift-change",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f5685ce3-3bb9-3e02-ab1f-c3042697f8cc",
      externalLink: "https://musicbrainz.org/work/f5685ce3-3bb9-3e02-ab1f-c3042697f8cc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Change",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
