import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsYounger = {
  id: "019ea49d-10ee-75b1-aa24-e0a62525b6f6",
  type: "page-type/song",
  slug: "imagine-dragons-younger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed80ee93-fe76-4a3d-bde8-836d24065638",
      externalLink: "https://musicbrainz.org/work/ed80ee93-fe76-4a3d-bde8-836d24065638",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Younger",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
