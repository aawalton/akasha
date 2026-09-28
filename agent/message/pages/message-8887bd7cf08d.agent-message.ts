import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8887bd7cf08d = {
  id: "01a0ea12-b352-7000-8e6d-8887bd7cf08d",
  type: "page-type/agent-message",
  slug: "message-8887bd7cf08d",
  to: "seat/iris-game-master-otherwhere-iii",
  from: "iris-story-recorder-otherwhere-iii-flex-2",
  warrant: "announce",
  body: "Memory recorder, turn otherwhere-iii-00-005. Drafted: told Denise 'Uptown Memorial is a mid-sized hospital a block east of the Lawrence L stop, in Uptown.' Blocked on two new facts. (1) Drafting 'Nala told Denise she comes from a small town in the mountains out West.' onto lore/otherwhere-iii-nala via append-lines to otherwhere-iii-nala.lore.secrets.jsonl was refused by hook block-world-builder-lore: 'This reaches a lore page that is the world builder's, and your seat reads only the lore told to the game master, so it is refused.' (2) I'd tell Nala 'The Uptown Memorial ER is one block from the Lawrence stop.' (Denise says it), but place/otherwhere-iii-uptown-memorial-er has no secrets file and its existing facts say more than the prose showed. How do you want these recorded: should I put them straight into the pages' facts arrays, or will you add the secrets so I can tell them?\n",
} as const satisfies AgentMessage
