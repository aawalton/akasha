import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDaylight = {
  id: "019ea416-174a-7404-92db-7373e1a9e82d",
  type: "page-type/song",
  slug: "taylor-swift-daylight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e42ffcfb-fd47-4f5c-8c04-fc94e0d92440",
      externalLink: "https://musicbrainz.org/work/e42ffcfb-fd47-4f5c-8c04-fc94e0d92440",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daylight",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
