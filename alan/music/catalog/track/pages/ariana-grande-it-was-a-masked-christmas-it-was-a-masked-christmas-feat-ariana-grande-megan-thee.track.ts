import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeItWasAMaskedChristmasItWasAMaskedChristmasFeatArianaGrandeMeganThee = {
  id: "01a0a6c5-36aa-7d3d-a9d6-1e2633a91734",
  type: "page-type/track",
  slug: "ariana-grande-it-was-a-masked-christmas-it-was-a-masked-christmas-feat-ariana-grande-megan-thee",
  ownLength: 3.01515,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-it-was-a-masked-christmas"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vGVNj5Fmn4TU4foavNZG1",
      externalLink: "https://open.spotify.com/track/0vGVNj5Fmn4TU4foavNZG1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "It Was A… (Masked Christmas) (feat. Ariana Grande & Megan Thee Stallion)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7mAcgRMD6EfCKHO6cIkDOP", artistName: "Jimmy Fallon" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "181bsRPaVXVlUKXrxwZfHK", artistName: "Megan Thee Stallion" },
  ],
  trackKey:
    "itwasamaskedchristmasfeatarianagrandemegantheestallion|181bsRPaVXVlUKXrxwZfHK,66CXWjxzNUsdJxJ2JdwvnR,7mAcgRMD6EfCKHO6cIkDOP|180909",
  song: "song/ariana-grande-it-was-a-masked-christmas",
} as const satisfies Track
