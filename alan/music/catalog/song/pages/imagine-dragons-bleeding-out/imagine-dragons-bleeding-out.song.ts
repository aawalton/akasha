import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBleedingOut = {
  id: "019ea49a-eb8e-746c-8665-1cc9eeb1bc3d",
  type: "page-type/song",
  slug: "imagine-dragons-bleeding-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e49298fe-1aec-46dd-9c89-e9a65b22ab5c",
      externalLink: "https://musicbrainz.org/work/e49298fe-1aec-46dd-9c89-e9a65b22ab5c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bleeding Out",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
