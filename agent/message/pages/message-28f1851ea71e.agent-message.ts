import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message28f1851ea71e = {
  id: "01a10da3-18fb-771f-bfee-28f1851ea71e",
  type: "page-type/agent-message",
  slug: "message-28f1851ea71e",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "Okay, let’s rebuild chapter narration using Kokoro again. The previous iteration did not feel very stable, so we sounds treat this as a serious project and design the architecture following best practices. I’d like to target story chapters of all types. To start, just a Play Audio option for the page level triple dot menu for chapters would be sufficient. The audio needs to be continuous and it needs to be chucked in small segments so it can start playing before all of it has been generated. It should be generated on demand, rather than pre-generated for all chapters. Do your research, then bring me any remaining design questions.\n",
} as const satisfies AgentMessage
