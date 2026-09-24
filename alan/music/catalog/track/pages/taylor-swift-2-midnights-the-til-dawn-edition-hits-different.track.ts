import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionHitsDifferent = {
  id: "01a0ce86-4c94-7682-9a90-0bdd5a8e8dce",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-hits-different",
  ownLength: 3.907766666666667,
  ownProgress: 3.907766666666667,
  partOfCollections: ["release/taylor-swift-2-midnights-the-til-dawn-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hits Different",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "hitsdifferent|06HL4z0CvFAxyc27GXpf02|234466",
  song: "song/taylor-swift-hits-different",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 21,
      externalId: "3xYJScVfxByb61dYHTwiby",
      externalLink: "https://open.spotify.com/track/3xYJScVfxByb61dYHTwiby",
    },
  ],
} as const satisfies Track
