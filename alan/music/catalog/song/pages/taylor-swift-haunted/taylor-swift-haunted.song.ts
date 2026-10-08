import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHaunted = {
  id: "019ea416-1fb3-7271-a0d8-87e6cb12ac01",
  type: "page-type/song",
  slug: "taylor-swift-haunted",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "642e67bb-1e6f-3275-93fb-02d99f55ac85",
      externalLink: "https://musicbrainz.org/work/642e67bb-1e6f-3275-93fb-02d99f55ac85",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Haunted",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:13.875Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
