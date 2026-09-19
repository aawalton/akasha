import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxInMemory = {
  id: "019ea4f6-0adb-70e8-9c72-c798b42637eb",
  type: "page-type/song",
  slug: "lilith-max-in-memory",
  title: "In Memory",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4106824-68ba-4110-9405-de01e2a87ccb",
      externalLink: "https://musicbrainz.org/recording/c4106824-68ba-4110-9405-de01e2a87ccb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
