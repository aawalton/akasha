import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSuburbanLegends = {
  id: "019ea416-2e4e-7afa-bd2e-b60bf602fec7",
  type: "page-type/song",
  slug: "taylor-swift-suburban-legends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "09531648-3078-4458-a778-c9fbef55afa4",
      externalLink: "https://musicbrainz.org/work/09531648-3078-4458-a778-c9fbef55afa4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Suburban Legends",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
