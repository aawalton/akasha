import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBulletInAGun = {
  id: "019ea497-df37-7389-95dc-f9ff2c5b04b5",
  type: "page-type/song",
  slug: "imagine-dragons-bullet-in-a-gun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "478a926d-ffcb-4376-bb86-459e8ade8caf",
      externalLink: "https://musicbrainz.org/work/478a926d-ffcb-4376-bb86-459e8ade8caf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bullet in a Gun",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
