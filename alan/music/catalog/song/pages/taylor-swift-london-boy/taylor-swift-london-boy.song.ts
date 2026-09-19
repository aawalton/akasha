import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLondonBoy = {
  id: "019ea416-1be4-7b6a-a754-5a1085508d96",
  type: "page-type/song",
  slug: "taylor-swift-london-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2c161280-b221-4cad-9cce-a4fabf498200",
      externalLink: "https://musicbrainz.org/work/2c161280-b221-4cad-9cce-a4fabf498200",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "London Boy",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
