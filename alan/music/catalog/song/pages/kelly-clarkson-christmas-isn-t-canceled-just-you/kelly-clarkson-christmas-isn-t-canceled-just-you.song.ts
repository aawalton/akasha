import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonChristmasIsnTCanceledJustYou = {
  id: "019ea4ae-b35b-7626-8294-a677fc4f1fad",
  type: "page-type/song",
  slug: "kelly-clarkson-christmas-isn-t-canceled-just-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62d59cf2-1382-47af-b76e-4d94779ffa27",
      externalLink: "https://musicbrainz.org/work/62d59cf2-1382-47af-b76e-4d94779ffa27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Isn’t Canceled (Just You)",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
