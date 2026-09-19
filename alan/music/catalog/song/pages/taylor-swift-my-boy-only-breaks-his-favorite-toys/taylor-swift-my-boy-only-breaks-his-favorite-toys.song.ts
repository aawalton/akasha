import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMyBoyOnlyBreaksHisFavoriteToys = {
  id: "019ea416-394b-7004-8756-84feff7f58bb",
  type: "page-type/song",
  slug: "taylor-swift-my-boy-only-breaks-his-favorite-toys",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9bf31510-840c-4814-80a9-3f4bd43a7113",
      externalLink: "https://musicbrainz.org/work/9bf31510-840c-4814-80a9-3f4bd43a7113",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Boy Only Breaks His Favorite Toys",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
