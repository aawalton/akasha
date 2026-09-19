import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUntitled3 = {
  id: "01a0ba5d-3cab-76a8-ad3a-fb5aaffc411d",
  type: "page-type/song",
  slug: "coldplay-untitled-3",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4527e241-e493-4e16-be55-601b0c63fa0e",
      externalLink: "https://musicbrainz.org/work/4527e241-e493-4e16-be55-601b0c63fa0e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "❤️",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
