import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftOnlyTheYoung = {
  id: "019ea416-381f-7725-a4e3-f9c7662ee2fb",
  type: "song",
  slug: "taylor-swift-only-the-young",
  title: "Only the Young",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a597473-3eef-48aa-ac6a-49c632523ddc",
      externalLink: "https://musicbrainz.org/work/7a597473-3eef-48aa-ac6a-49c632523ddc",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
