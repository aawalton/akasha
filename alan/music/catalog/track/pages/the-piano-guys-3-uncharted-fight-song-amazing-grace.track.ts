import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedFightSongAmazingGrace = {
  id: "01a0afa2-1155-7672-8543-24bc991a5623",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-fight-song-amazing-grace",
  ownLength: 4.0802,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0enLtCNBPxgqHQJ68Uk1H8",
      externalLink: "https://open.spotify.com/track/0enLtCNBPxgqHQJ68Uk1H8",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Fight Song / Amazing Grace",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "fightsongamazinggrace|0jW6R8CVyVohuUJVcuweDI|244812",
  song: "song/the-piano-guys-fight-song-amazing-grace",
} as const satisfies Track
