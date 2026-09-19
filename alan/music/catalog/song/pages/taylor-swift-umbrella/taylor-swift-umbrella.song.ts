import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftUmbrella = {
  id: "019ea416-4883-71b2-bc06-f3d127c11b97",
  type: "page-type/song",
  slug: "taylor-swift-umbrella",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a505f520-f503-34e4-9838-a8c459bd0188",
      externalLink: "https://musicbrainz.org/work/a505f520-f503-34e4-9838-a8c459bd0188",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Umbrella",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
