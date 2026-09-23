import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBlankSpaceVoiceMemo = {
  id: "01a0ce86-8127-7d35-91ff-9bd239f5add6",
  type: "page-type/song",
  slug: "taylor-swift-blank-space-voice-memo",
  title: "Blank Space - Voice Memo",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
