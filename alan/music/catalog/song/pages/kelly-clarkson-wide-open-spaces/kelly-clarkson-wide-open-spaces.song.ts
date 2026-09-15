import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWideOpenSpaces = {
  id: "019ea4b2-2b4b-7f95-bc30-c9d3f5b39e60",
  type: "song",
  slug: "kelly-clarkson-wide-open-spaces",
  title: "Wide Open Spaces",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b0f9afd-1113-4176-8766-8e3c8bf67b53",
      externalLink: "https://musicbrainz.org/work/4b0f9afd-1113-4176-8766-8e3c8bf67b53",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
