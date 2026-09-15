import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsCoverUp = {
  id: "019ea499-115d-727e-aa73-bffe85edc9fd",
  type: "page-type/song",
  slug: "imagine-dragons-cover-up",
  title: "Cover Up",
  artist: "artist/imagine-dragons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "77cfdc67-24be-4611-a9a0-9c540ccb2fbc",
      externalLink: "https://musicbrainz.org/work/77cfdc67-24be-4611-a9a0-9c540ccb2fbc",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
