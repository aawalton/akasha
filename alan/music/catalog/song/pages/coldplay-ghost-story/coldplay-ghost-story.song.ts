import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGhostStory = {
  id: "01a0ba5d-487c-77bb-9cb9-ae5305ea0c63",
  type: "page-type/song",
  slug: "coldplay-ghost-story",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ded728d7-7e5e-434b-bd09-53ef21e31aa2",
      externalLink: "https://musicbrainz.org/work/ded728d7-7e5e-434b-bd09-53ef21e31aa2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ghost Story",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
