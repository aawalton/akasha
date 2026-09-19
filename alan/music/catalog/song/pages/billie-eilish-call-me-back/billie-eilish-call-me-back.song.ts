import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishCallMeBack = {
  id: "019ea4ac-6365-733d-8be6-dc1a98efed0a",
  type: "page-type/song",
  slug: "billie-eilish-call-me-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fdcf502f-2123-4da8-ae04-de5476516571",
      externalLink: "https://musicbrainz.org/work/fdcf502f-2123-4da8-ae04-de5476516571",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Call Me Back",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
