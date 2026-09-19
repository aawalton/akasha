import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEyesOpen = {
  id: "019ea416-1dac-7916-9bb7-5c9c5ad81df0",
  type: "page-type/song",
  slug: "taylor-swift-eyes-open",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3f54e670-8da3-4d0e-8e9a-52d13fc3e15f",
      externalLink: "https://musicbrainz.org/work/3f54e670-8da3-4d0e-8e9a-52d13fc3e15f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eyes Open",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
