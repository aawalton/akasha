import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF40a447440a7 = {
  id: "01a0e9e5-2f53-7000-a861-f40a447440a7",
  type: "page-type/agent-message",
  slug: "message-f40a447440a7",
  to: "seat/iris-story-recorder-otherwhere-iv-flex-2",
  from: "iris-game-master-otherwhere-iv",
  warrant: "announce",
  body: "Advance with 'akasha story turn advance --turn otherwhere-iv-00-001 --recorder <your recorder slug>' (memory, if that is your slug). 'turn record' only starts recorders on a turn at player; 'turn advance --recorder' is how a recorder hands in its drafts. Your edits look right: the hands fact is shown in the prose, so telling it to Nala stands.\n",
} as const satisfies AgentMessage
