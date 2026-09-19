import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragons30Lives = {
  id: "019ea497-9c54-7ba5-8c28-b0586e7da6a8",
  type: "page-type/song",
  slug: "imagine-dragons-30-lives",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "402ed1d0-ba31-4a5c-b246-6a4d82d9e623",
      externalLink: "https://musicbrainz.org/work/402ed1d0-ba31-4a5c-b246-6a4d82d9e623",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "30 Lives",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
