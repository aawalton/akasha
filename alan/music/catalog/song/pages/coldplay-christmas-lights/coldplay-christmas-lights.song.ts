import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayChristmasLights = {
  id: "01a0ba5d-4324-77fe-9543-ad1b6c76fbbe",
  type: "page-type/song",
  slug: "coldplay-christmas-lights",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a231c24-e5ef-4736-bf77-6b8f35bcf7f8",
      externalLink: "https://musicbrainz.org/work/9a231c24-e5ef-4736-bf77-6b8f35bcf7f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Lights",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
