import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMyBaby = {
  id: "019ea4a5-a5b0-7e94-83f4-52e50d398002",
  type: "page-type/song",
  slug: "aurora-my-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6accab02-9406-49ca-9857-c426baf8e06c",
      externalLink: "https://musicbrainz.org/work/6accab02-9406-49ca-9857-c426baf8e06c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "MY BABY",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
