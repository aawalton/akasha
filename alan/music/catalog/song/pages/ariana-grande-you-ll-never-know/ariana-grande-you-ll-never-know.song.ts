import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeYouLlNeverKnow = {
  id: "019ea4e8-b7a6-7042-a133-8baf16221307",
  type: "page-type/song",
  slug: "ariana-grande-you-ll-never-know",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20c6c070-26b8-41a4-9266-dab0f343a36d",
      externalLink: "https://musicbrainz.org/work/20c6c070-26b8-41a4-9266-dab0f343a36d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’ll Never Know",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:46:15.334Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
