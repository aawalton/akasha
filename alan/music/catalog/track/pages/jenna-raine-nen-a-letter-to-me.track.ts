import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNenALetterToMe = {
  id: "01a0c621-2844-7a93-b575-7a15cacf34d9",
  type: "page-type/track",
  slug: "jenna-raine-nen-a-letter-to-me",
  ownLength: 2.9325666666666668,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-nen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "a letter to me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "alettertome|3aHe9rMa5HFTjXHw8tEz0A|175954",
  song: "song/jenna-raine-a-letter-to-me",
  carriedBy: [
    {
      release: "release/jenna-raine-nen",
      discNumber: 1,
      position: 1,
      externalId: "7HavjIWu36TcwxLgxrzB0G",
      externalLink: "https://open.spotify.com/track/7HavjIWu36TcwxLgxrzB0G",
    },
  ],
} as const satisfies Track
