import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsLeaveMe = {
  id: "019ea499-5673-7866-b290-5694b62398c3",
  type: "page-type/song",
  slug: "imagine-dragons-leave-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83f9b6c1-d0be-419c-b851-892fcd4c06d5",
      externalLink: "https://musicbrainz.org/work/83f9b6c1-d0be-419c-b851-892fcd4c06d5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Leave Me",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
