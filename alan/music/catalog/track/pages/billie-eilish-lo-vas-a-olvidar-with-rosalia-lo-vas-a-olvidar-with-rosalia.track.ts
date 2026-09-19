import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishLoVasAOlvidarWithRosaliaLoVasAOlvidarWithRosalia = {
  id: "01a0b638-e975-7b74-9a1d-b85fb2084ca7",
  type: "page-type/track",
  slug: "billie-eilish-lo-vas-a-olvidar-with-rosalia-lo-vas-a-olvidar-with-rosalia",
  ownLength: 3.3910666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-lo-vas-a-olvidar-with-rosalia"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0psS4i5YooJrXfDnGvWRLi",
      externalLink: "https://open.spotify.com/track/0psS4i5YooJrXfDnGvWRLi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Lo Vas A Olvidar (with ROSALÍA)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "7ltDVBr6mKbRvohxheJ9h1", artistName: "ROSALÍA" },
  ],
  trackKey: "lovasaolvidarwithrosalia|6qqNVTkY8uBg9cP3Jd7DAH,7ltDVBr6mKbRvohxheJ9h1|203464",
  song: "song/billie-eilish-lo-vas-a-olvidar",
} as const satisfies Track
