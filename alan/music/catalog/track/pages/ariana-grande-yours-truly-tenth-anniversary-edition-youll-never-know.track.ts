import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionYoullNeverKnow = {
  id: "01a0a6c5-1d68-7e08-a875-7bf288232b93",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-youll-never-know",
  ownLength: 3.5713333333333335,
  ownProgress: 3.5713333333333335,
  partOfCollections: [
    "release/ariana-grande-yours-truly-tenth-anniversary-edition",
    "release/ariana-grande-yours-truly",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "You’ll Never Know",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "youllneverknow|66CXWjxzNUsdJxJ2JdwvnR|214280",
  song: "song/ariana-grande-you-ll-never-know",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 9,
      externalId: "4PqIj0WOfPAq4QAvisjgpd",
      externalLink: "https://open.spotify.com/track/4PqIj0WOfPAq4QAvisjgpd",
    },
    {
      release: "release/ariana-grande-yours-truly-tenth-anniversary-edition",
      discNumber: 1,
      position: 9,
      externalId: "5HGvnxyYMsK0MWuvXCNjfG",
      externalLink: "https://open.spotify.com/track/5HGvnxyYMsK0MWuvXCNjfG",
    },
  ],
} as const satisfies Track
