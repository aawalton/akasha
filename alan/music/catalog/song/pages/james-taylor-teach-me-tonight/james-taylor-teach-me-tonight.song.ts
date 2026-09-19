import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTeachMeTonight = {
  id: "01a0b72f-4a25-766c-ae8a-23f04721ed01",
  type: "page-type/song",
  slug: "james-taylor-teach-me-tonight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "385ad09b-45dd-3a33-9c01-9a6b7e307b28",
      externalLink: "https://musicbrainz.org/work/385ad09b-45dd-3a33-9c01-9a6b7e307b28",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Teach Me Tonight",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
