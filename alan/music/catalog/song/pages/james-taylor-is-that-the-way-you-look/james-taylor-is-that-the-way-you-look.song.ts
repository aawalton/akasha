import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIsThatTheWayYouLook = {
  id: "01a0b72f-3b32-7198-a6dc-1fbe15d5571b",
  type: "page-type/song",
  slug: "james-taylor-is-that-the-way-you-look",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9204d5ef-cdb7-42ef-9ac3-ee7cfe292a9f",
      externalLink: "https://musicbrainz.org/work/9204d5ef-cdb7-42ef-9ac3-ee7cfe292a9f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Is That the Way You Look?",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
