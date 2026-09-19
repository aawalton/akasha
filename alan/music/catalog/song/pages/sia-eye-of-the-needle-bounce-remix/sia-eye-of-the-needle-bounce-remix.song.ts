import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaEyeOfTheNeedleBounceRemix = {
  id: "01a0ba9d-fe9f-7e3b-9450-00d8ce38c4f2",
  type: "page-type/song",
  slug: "sia-eye-of-the-needle-bounce-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "28a95125-142f-48ed-ae34-3ef81f14cceb",
      externalLink: "https://musicbrainz.org/work/28a95125-142f-48ed-ae34-3ef81f14cceb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eye of the Needle (Bounce remix)",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
