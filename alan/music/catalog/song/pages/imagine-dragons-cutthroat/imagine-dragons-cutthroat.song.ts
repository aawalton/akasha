import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsCutthroat = {
  id: "019ea499-be6a-7b53-b1b7-eff87805079f",
  type: "page-type/song",
  slug: "imagine-dragons-cutthroat",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a53cb92-b172-4504-8dce-8e0b9f83c84e",
      externalLink: "https://musicbrainz.org/work/9a53cb92-b172-4504-8dce-8e0b9f83c84e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cutthroat",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
