import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodBeethovens5Secrets = {
  id: "01a0afa2-1b8d-7c56-b423-c1767279e11b",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-beethovens-5-secrets",
  ownLength: 5.1611,
  ownProgress: 5.1611,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Beethoven's 5 Secrets",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/the-piano-guys" },
    { artistName: "Lyceum Philharmonic at American Heritage School" },
    { artistName: "Julie Ann Nelson" },
    { artistName: "John Nelson" },
  ],
  trackKey:
    "beethovens5secrets|0jW6R8CVyVohuUJVcuweDI,0rUC7g0r3Q9pfNeeVioxzC,3ewlE33E3BBy5izrlsaR0G,6k7qMS96A3GiN8ZvZgo3u6|309666",
  song: "song/the-piano-guys-beethovens-5-secrets",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 6,
      externalId: "2USO0g3wAxT0wX3Be7w1TM",
      externalLink: "https://open.spotify.com/track/2USO0g3wAxT0wX3Be7w1TM",
    },
  ],
} as const satisfies Track
