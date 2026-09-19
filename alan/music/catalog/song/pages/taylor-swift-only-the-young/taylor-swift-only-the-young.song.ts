import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftOnlyTheYoung = {
  id: "019ea416-381f-7725-a4e3-f9c7662ee2fb",
  type: "page-type/song",
  slug: "taylor-swift-only-the-young",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a597473-3eef-48aa-ac6a-49c632523ddc",
      externalLink: "https://musicbrainz.org/work/7a597473-3eef-48aa-ac6a-49c632523ddc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only the Young",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
