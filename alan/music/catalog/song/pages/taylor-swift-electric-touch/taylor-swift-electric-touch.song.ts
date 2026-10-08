import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftElectricTouch = {
  id: "019ea416-068b-7e98-9da3-d749fb6639bb",
  type: "page-type/song",
  slug: "taylor-swift-electric-touch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3d7f6e77-f875-4238-a633-2b8d89b497d7",
      externalLink: "https://musicbrainz.org/work/3d7f6e77-f875-4238-a633-2b8d89b497d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Electric Touch",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:07.435Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
