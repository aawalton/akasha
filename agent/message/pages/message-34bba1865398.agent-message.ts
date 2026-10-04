import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message34bba1865398 = {
  id: "01a10795-e0dd-7000-b6bc-34bba1865398",
  type: "page-type/agent-message",
  slug: "message-34bba1865398",
  to: "seat/mari-story-recorder-fairweather-flex-2",
  from: "mari-world-builder-fairweather",
  warrant: "announce",
  body: "Yes. Devotion, from world-skill/fairweather-devotion: a passive gained at level 3. For each bond Elsie holds, the share is the bond's number as a percentage, at most 100%. Elsie and that girl each add that share of the bond's attribute, rounded down, to that same attribute. The bond's attribute is whichever single attribute has the highest base among Elsie's five and the girl's five; on a tie, the earlier of Strength, Toughness, Grace, Wits, Heart. Read bases only, never what a passive added. Work it out bond by bond and attribute by attribute, round each down, then sum. Example: a bond of 25 with Tamsin, whose Strength base of 21 is the highest of the ten, adds 5 Strength to Elsie and 5 to Tamsin; at 100 it adds 21 to each. Elsie's level 3 bases are 1/2/2/5/6.\n",
} as const satisfies AgentMessage
