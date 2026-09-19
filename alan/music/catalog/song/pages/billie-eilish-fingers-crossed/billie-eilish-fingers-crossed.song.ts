import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishFingersCrossed = {
  id: "019ea4a9-c70c-7ede-94de-90a8f0a403e8",
  type: "page-type/song",
  slug: "billie-eilish-fingers-crossed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65d335b9-89f7-4dfe-8911-4e13108286c0",
      externalLink: "https://musicbrainz.org/work/65d335b9-89f7-4dfe-8911-4e13108286c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fingers Crossed",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
