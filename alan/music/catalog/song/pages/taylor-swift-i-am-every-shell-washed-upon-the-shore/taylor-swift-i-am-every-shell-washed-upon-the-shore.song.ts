import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIAmEveryShellWashedUponTheShore = {
  id: "019ea416-2bf0-74b0-91e1-513e4ad7ed43",
  type: "page-type/song",
  slug: "taylor-swift-i-am-every-shell-washed-upon-the-shore",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f42dbfdf-df50-4f57-bdd3-3840163891fd",
      externalLink: "https://musicbrainz.org/work/f42dbfdf-df50-4f57-bdd3-3840163891fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Am Every Shell Washed Upon the Shore",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
