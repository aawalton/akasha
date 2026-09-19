import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBoomerang = {
  id: "019ea498-9ad8-72b0-8dab-50b382948b58",
  type: "page-type/song",
  slug: "imagine-dragons-boomerang",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "67df168b-a709-4658-945b-9e0a2f31a9ff",
      externalLink: "https://musicbrainz.org/work/67df168b-a709-4658-945b-9e0a2f31a9ff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Boomerang",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
