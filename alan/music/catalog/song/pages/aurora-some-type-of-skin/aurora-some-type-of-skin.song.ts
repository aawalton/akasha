import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSomeTypeOfSkin = {
  id: "019ea4a6-28b5-746a-8a1f-f850797f56db",
  type: "page-type/song",
  slug: "aurora-some-type-of-skin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90d0ad13-a202-4487-9c23-709b08085994",
      externalLink: "https://musicbrainz.org/work/90d0ad13-a202-4487-9c23-709b08085994",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Some Type of Skin",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
