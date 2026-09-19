import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTrampoline = {
  id: "019ea4c1-2edc-76ad-adb0-e0c89c792694",
  type: "page-type/song",
  slug: "kelly-clarkson-trampoline",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ac60bfa4-b797-4960-8e7a-7c4bfb1ed816",
      externalLink: "https://musicbrainz.org/work/ac60bfa4-b797-4960-8e7a-7c4bfb1ed816",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trampoline",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
