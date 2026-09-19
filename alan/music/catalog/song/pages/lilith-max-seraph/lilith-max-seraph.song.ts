import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxSeraph = {
  id: "019ea4f6-39f5-716c-a1d6-0d3dff2dfeee",
  type: "page-type/song",
  slug: "lilith-max-seraph",
  title: "Seraph",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "53a923bf-e6c4-4ea0-9663-b5ab29311c97",
      externalLink: "https://musicbrainz.org/recording/53a923bf-e6c4-4ea0-9663-b5ab29311c97",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
