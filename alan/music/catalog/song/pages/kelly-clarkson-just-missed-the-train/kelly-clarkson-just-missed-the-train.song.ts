import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonJustMissedTheTrain = {
  id: "019ea4ad-59a9-79d4-ae55-dc372baa4745",
  type: "page-type/song",
  slug: "kelly-clarkson-just-missed-the-train",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2bdce8d5-1ee0-4a79-aa39-091c91b1de40",
      externalLink: "https://musicbrainz.org/work/2bdce8d5-1ee0-4a79-aa39-091c91b1de40",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Just Missed the Train",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
