import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishEverybodyDies = {
  id: "019ea4a9-b701-78c1-9064-3ab0e0947159",
  type: "page-type/song",
  slug: "billie-eilish-everybody-dies",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "610dc24d-f72f-4f22-b577-99b9bc8f2105",
      externalLink: "https://musicbrainz.org/work/610dc24d-f72f-4f22-b577-99b9bc8f2105",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everybody Dies",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
