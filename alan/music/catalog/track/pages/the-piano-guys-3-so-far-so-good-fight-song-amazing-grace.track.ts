import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodFightSongAmazingGrace = {
  id: "01a0afa2-1b21-7ff5-84fa-f2669527d78c",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-fight-song-amazing-grace",
  ownLength: 4.079816666666667,
  ownProgress: 4.079816666666667,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fight Song / Amazing Grace",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "fightsongamazinggrace|0jW6R8CVyVohuUJVcuweDI|244789",
  song: "song/the-piano-guys-fight-song-amazing-grace",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 3,
      externalId: "6s2XoWGkMatXbwOW6SGZuf",
      externalLink: "https://open.spotify.com/track/6s2XoWGkMatXbwOW6SGZuf",
    },
  ],
} as const satisfies Track
