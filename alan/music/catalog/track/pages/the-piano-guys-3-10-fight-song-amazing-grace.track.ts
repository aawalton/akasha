import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310FightSongAmazingGrace = {
  id: "01a0afa2-0deb-7c39-914b-3cc278daba4a",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-fight-song-amazing-grace",
  ownLength: 4.0823833333333335,
  ownProgress: 4.0823833333333335,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-2",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Fight Song / Amazing Grace",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "fightsongamazinggrace|0jW6R8CVyVohuUJVcuweDI|244943",
  song: "song/the-piano-guys-fight-song-amazing-grace",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 15,
      externalId: "2lEzFalDoEoI3D9h7E5C9g",
      externalLink: "https://open.spotify.com/track/2lEzFalDoEoI3D9h7E5C9g",
    },
    {
      release: "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-2",
      discNumber: 1,
      position: 8,
      externalId: "4akhw7G1pADAGzt92FaLpX",
      externalLink: "https://open.spotify.com/track/4akhw7G1pADAGzt92FaLpX",
    },
  ],
} as const satisfies Track
