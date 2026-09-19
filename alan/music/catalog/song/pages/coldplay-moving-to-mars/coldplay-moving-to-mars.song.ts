import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMovingToMars = {
  id: "01a0ba5d-4d28-70df-b019-c8c7fc16ee96",
  type: "page-type/song",
  slug: "coldplay-moving-to-mars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "245ce670-0af9-46bd-96ee-364432b53c54",
      externalLink: "https://musicbrainz.org/work/245ce670-0af9-46bd-96ee-364432b53c54",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Moving to Mars",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
