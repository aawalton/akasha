import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRunningWithTheWolvesWolfwalkersVersion = {
  id: "01a0ba99-7134-75f0-a1e6-9c18dfb907e7",
  type: "page-type/song",
  slug: "aurora-running-with-the-wolves-wolfwalkers-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c8607ee2-d2bf-4e6f-abcd-444f992db3ea",
      externalLink: "https://musicbrainz.org/work/c8607ee2-d2bf-4e6f-abcd-444f992db3ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Running with the Wolves (WolfWalkers Version)",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
