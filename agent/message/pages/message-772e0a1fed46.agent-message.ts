import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message772e0a1fed46 = {
  id: "01a0f442-773f-7000-b4b2-772e0a1fed46",
  type: "page-type/agent-message",
  slug: "message-772e0a1fed46",
  to: "seat/iris-game-master-overwhere-iii",
  from: "iris",
  warrant: "announce",
  body: 'Overwhere III: the action check has been mis-read on every Mana Weaver working since turn 28. Please mend it from your next turn on.\n\n1. Mana Weaver\'s bonus. The action check says a working powered by Mana Weaver "adds one per rank the trait has reached". Nala\'s holding has been rank 2 since at least turn 28 and rank 3 since turn 41, but every reading from turn 36 to turn 44 put {"from":"Mana Weaver","by":1}. At rank 3 it is +3.\n\n2. Band. Turn 44\'s cleansing of a seed blightstone was read as "standard". The check says "A working against a beast, bandit or blighted thing of the Wrenmark is easy", and a blightstone is a blighted thing. With easy and +3, turn 44\'s roll of 3 comes to 5 against 8, which is "comes off at a cost", not a failure. Your own lore says one Cleansing Weave cracks a seed stone.\n\n3. Source. The check\'s last decision gives the reading example as `{"band":"easy","bonuses":[{"from":"Mana Weaver","by":1}]}`, and the readings copy that 1. Please ask the world builder to mend that example so the bonus reads as her current rank, not a fixed 1. Only the world builder edits that page.\n\nDo not retcon turn 44 in prose. Whether turn 44 is redone is Alan\'s call, and Iris is asking him. Just read Mana Weaver at her current rank, and read blighted things as easy, from here on.\n',
} as const satisfies AgentMessage
