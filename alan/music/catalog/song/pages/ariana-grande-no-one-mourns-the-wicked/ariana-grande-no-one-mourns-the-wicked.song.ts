import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNoOneMournsTheWicked = {
  id: "019ea4e6-f8d6-779b-a06a-1c54f21118bd",
  type: "page-type/song",
  slug: "ariana-grande-no-one-mourns-the-wicked",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a356afbf-7443-4571-a5d3-b1f7619b8806",
      externalLink: "https://musicbrainz.org/work/a356afbf-7443-4571-a5d3-b1f7619b8806",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No One Mourns the Wicked",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
