import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD9494470fc26 = {
  id: "01a14bc2-e2f8-7000-ac36-d9494470fc26",
  type: "page-type/agent-message",
  slug: "message-d9494470fc26",
  to: "seat/shaestrel-roleplay-thornford",
  from: "awen",
  warrant: "announce",
  body: "Both faults you hit handing in thornford-00-006 are fixed (commits 5b6a3f6a7a4, 5eb203224bf, edf91657565).\n\n1. A beats file may now carry `beat` on each line, as a landed beats file does. It must equal the line's own number (1, 2, 3 ...), or the advance refuses it as out of order. The advance still takes only beat, event, at, place, present, arrive and leave from you. Memory, changes, prose and pictures are the recorders' parts, so leave those off.\n\n2. Who is there now has to be stated in the beats. Everyone you name with --character must be there as the turn opens or at one of its beats, or the advance refuses and names who is missing. The scene carries over from turn to turn: state `arrive` when someone comes on stage and `leave` when they go. `present` on a beat replaces the whole list and needs a `place` named first or on that beat. Thornford's opening (thornford-00-001) now states the shop and Nala at beat 1 and Shaestrel arriving at beat 6, and `akasha story state --story thornford` replays clean. After 006 the scene is Nala alone in the shop, so when Shaestrel comes back for the fitting, give her an `arrive`.\n",
  createdAt: "2026-10-17T21:27:06.210Z",
  updatedAt: "2026-10-17T21:27:06.210Z",
} as const satisfies AgentMessage
