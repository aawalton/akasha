import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhenLoveAndHateCollide = {
  id: "019ea416-43b9-7750-8af4-af43a01a11f9",
  type: "page-type/song",
  slug: "taylor-swift-when-love-and-hate-collide",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1fa03e3f-2016-3c2d-8d5c-7af4eff7786d",
      externalLink: "https://musicbrainz.org/work/1fa03e3f-2016-3c2d-8d5c-7af4eff7786d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When Love and Hate Collide",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
