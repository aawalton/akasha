import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310LoseYouToLoveMe = {
  id: "01a0afa2-0af2-743d-ba1d-a827130bf826",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-lose-you-to-love-me",
  ownLength: 4.963633333333333,
  ownProgress: 4.963633333333333,
  partOfCollections: ["release/the-piano-guys-3-10"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lose You To Love Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/the-piano-guys" },
    { artistName: "Chuck Myers" },
    { artistName: "Eric Shumway" },
    { artistName: "Rickey Shumway" },
  ],
  trackKey:
    "loseyoutoloveme|0jW6R8CVyVohuUJVcuweDI,2Kmde61lMC5krhNprC9v5F,3B05AVEBbrBHzXR80NAbSH,42kJx1vTbVTE3f78Khiiyn|297818",
  song: "song/the-piano-guys-lose-you-to-love-me",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 6,
      externalId: "3o1FeZiMPHD8E0LwLKLh3d",
      externalLink: "https://open.spotify.com/track/3o1FeZiMPHD8E0LwLKLh3d",
    },
  ],
} as const satisfies Track
