import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaEyeOfTheNeedleBounceRemix = {
  id: "019ea4c3-390a-70d6-824a-c57b48727798",
  type: "page-type/song",
  slug: "sia-eye-of-the-needle-bounce-remix",
  title: "Eye of the Needle (Bounce remix)",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "28a95125-142f-48ed-ae34-3ef81f14cceb",
      externalLink: "https://musicbrainz.org/work/28a95125-142f-48ed-ae34-3ef81f14cceb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
