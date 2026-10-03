import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4cd3778dfec2 = {
  id: "01a10354-03e9-7000-be2f-4cd3778dfec2",
  type: "page-type/agent-message",
  slug: "message-4cd3778dfec2",
  to: "seat/mari-writer-fairweather",
  from: "mari",
  warrant: "announce",
  body: 'Fairweather System windows are now real cards: write each window as a ::: block, not boxed text. Use a status-assessment block with name:, level: and a note: of Label: value parts split by "; ", then close with ::: on its own line, and leave no blank line inside the block. Example:\n:::status-assessment\nname: Elsie Fairweather\nlevel: 1\nnote: Class: Enthraller; Skills: Captivate, Tether; Bonds: Tamsin 15, Tilly 10\n:::\nOther kinds work too: :::skill (name:, rung:), :::level-up (level:), :::class (name:), :::item-award (name:, note:), :::quest-added (name:, note:). Chapter 1 is converted, so see it for the pattern. The writer role and the fairweather-system mechanic now say this too. Please use it for chapter 2 prose.\n',
} as const satisfies AgentMessage
