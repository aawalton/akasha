import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsAmsterdam = {
  id: "019ea496-a7be-74ff-9b24-b2dde59541a0",
  type: "page-type/song",
  slug: "imagine-dragons-amsterdam",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "04592120-3daf-47f0-8aeb-985ef8c5b300",
      externalLink: "https://musicbrainz.org/work/04592120-3daf-47f0-8aeb-985ef8c5b300",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amsterdam",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
