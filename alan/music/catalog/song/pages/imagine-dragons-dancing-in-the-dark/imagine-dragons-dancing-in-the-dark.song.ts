import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDancingInTheDark = {
  id: "019ea49a-923f-7c30-a894-0373147b6576",
  type: "page-type/song",
  slug: "imagine-dragons-dancing-in-the-dark",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c54fabe0-0ba8-4bf8-b31c-1ff359b6719b",
      externalLink: "https://musicbrainz.org/work/c54fabe0-0ba8-4bf8-b31c-1ff359b6719b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dancing in the Dark",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
