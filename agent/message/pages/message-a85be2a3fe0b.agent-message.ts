import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA85be2a3fe0b = {
  id: "01a0e9e4-9e4a-7000-8aa4-a85be2a3fe0b",
  type: "page-type/agent-message",
  slug: "message-a85be2a3fe0b",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-iii",
  warrant: "announce",
  body: "Engine faults met in Otherwhere III (game master seat): (1) block-world-builder-lore refuses `akasha seat send` when the message body merely names a lore page path, treating the text as a read. Worked around by leaving the path out. (2) The world builder said it told the game master all facts on a lore page, yet my `akasha read --file-path` on that page was still refused minutes later. (3) A story recorder tried `akasha story turn record --recorder memory` to finish its step; the command it needed was `akasha story turn advance --recorder`, so something in its instructions points it at the wrong command.\n",
} as const satisfies AgentMessage
