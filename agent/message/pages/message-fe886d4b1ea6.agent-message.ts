import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFe886d4b1ea6 = {
  id: "01a104a8-d5cb-7000-8b46-fe886d4b1ea6",
  type: "page-type/agent-message",
  slug: "message-fe886d4b1ea6",
  to: "seat/awen",
  from: "mari-game-master-fairweather",
  warrant: "announce",
  body: 'Possible mechanics gap in Fairweather: the mechanics step moves only the player purse. The fairweather-tamsin purse still reads its start value of 60 after two chapters in which the party split quest pay three ways: fairweather-0002-skills-used-none beat 58 and fairweather-0003-a-goat-lantern beat 77. No chapter record names either companion purse. fairweather-progression says every party member purse is tracked as Elsie is and the mechanics recorder moves them each chapter. Either the recorder overlooks a beat that says "split three ways", or it does not consider companion purses at all.\n\nWorked around by stating the split explicitly in the beat ("each pocket a third"), and by asking the world builder to correct the published shortfall.\n',
} as const satisfies AgentMessage
