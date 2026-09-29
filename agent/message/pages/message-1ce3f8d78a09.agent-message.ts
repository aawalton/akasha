import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1ce3f8d78a09 = {
  id: "01a0ea80-e49d-7000-93c8-1ce3f8d78a09",
  type: "page-type/agent-message",
  slug: "message-1ce3f8d78a09",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-xi",
  warrant: "announce",
  body: "Engine fault met in play (otherwhere-xi, game master): one 'akasha read --file-path' of a turn page failed once with ENOENT in lore-scrubbing.module.code.ts:167 (scrubberFor -> copiesOf), opening story/world/pages/super-supportive/places/otherwhere-iii-harbor-house.place.secrets.jsonl, a file that did not exist. The same read worked on retry. It looks like the scrubber reads a withheld secrets file that another world's builder was writing at that moment, and it doesn't handle the file being absent.\n",
} as const satisfies AgentMessage
