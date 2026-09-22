import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxSeraphBearsWolves = {
  id: "01a0c95d-ff69-7b61-8e21-ecc17a1021d4",
  type: "page-type/track",
  slug: "lilith-max-seraph-bears-wolves",
  ownLength: 3.3131666666666666,
  ownProgress: 3.3131666666666666,
  partOfCollections: ["release/lilith-max-seraph", "release/lilith-max-bears-wolves"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bears & Wolves",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "bearswolves|797SPxZf82IYq3XCM8c9AM|198790",
  song: "song/lilith-max-bears-wolves",
  carriedBy: [
    {
      release: "release/lilith-max-bears-wolves",
      discNumber: 1,
      position: 1,
      externalId: "2nhBEHRRNGI8sJjW12PL5y",
      externalLink: "https://open.spotify.com/track/2nhBEHRRNGI8sJjW12PL5y",
    },
    {
      release: "release/lilith-max-seraph",
      discNumber: 1,
      position: 2,
      externalId: "2sulOSGGMb7Yo5qGC53sTV",
      externalLink: "https://open.spotify.com/track/2sulOSGGMb7Yo5qGC53sTV",
    },
  ],
} as const satisfies Track
