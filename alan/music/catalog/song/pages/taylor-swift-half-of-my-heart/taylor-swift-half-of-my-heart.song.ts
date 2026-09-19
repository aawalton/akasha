import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHalfOfMyHeart = {
  id: "019ea416-2857-7ccc-8fd6-296e9e7307f1",
  type: "page-type/song",
  slug: "taylor-swift-half-of-my-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b6a979c1-3f28-340c-93bb-95baf8dfdc27",
      externalLink: "https://musicbrainz.org/work/b6a979c1-3f28-340c-93bb-95baf8dfdc27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Half of My Heart",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
