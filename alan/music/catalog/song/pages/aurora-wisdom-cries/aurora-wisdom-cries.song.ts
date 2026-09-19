import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWisdomCries = {
  id: "019ea4a7-febe-76a1-a416-b21d56743a53",
  type: "page-type/song",
  slug: "aurora-wisdom-cries",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c663e93-9c48-4bd9-94d6-1f52b692766a",
      externalLink: "https://musicbrainz.org/work/9c663e93-9c48-4bd9-94d6-1f52b692766a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wisdom Cries",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
