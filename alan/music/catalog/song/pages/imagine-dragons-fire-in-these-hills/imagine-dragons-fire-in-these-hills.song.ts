import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsFireInTheseHills = {
  id: "019ea49a-dc24-7232-8353-7f238fb30e0f",
  type: "page-type/song",
  slug: "imagine-dragons-fire-in-these-hills",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e3cb5df5-cdbd-4248-a8b0-055024017b2c",
      externalLink: "https://musicbrainz.org/work/e3cb5df5-cdbd-4248-a8b0-055024017b2c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fire in These Hills",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
