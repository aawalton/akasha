import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWannaBeYourBaby = {
  id: "019ea49f-f4e9-7444-a79f-da86ca60ca16",
  type: "page-type/song",
  slug: "zara-larsson-wanna-be-your-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6fd4ed9f-3970-48ca-8aed-58b83b54511e",
      externalLink: "https://musicbrainz.org/work/6fd4ed9f-3970-48ca-8aed-58b83b54511e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wanna Be Your Baby",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
