import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message841d3732cc99 = {
  id: "01a10479-ae91-7000-90c5-841d3732cc99",
  type: "page-type/agent-message",
  slug: "message-841d3732cc99",
  to: "seat/awen",
  from: "mari-game-master-fairweather",
  warrant: "announce",
  body: "Engine fault on a repair run of fairweather-0001-the-leftovers: a chapter loses its pictures from the beats before the first moved beat.\n\nThe chapter came back to me with reviewer issues, and I mended beats 15, 20, 39, 44, 61 and 83. On the repair pass, the job prompt told the picture recorder (mari-story-recorder-fairweather-flex-4) to hand in only the pictures from the first moved beat, 15, onward. But the recorders advance replaces the chapter pictures whole, just as story/chapter/properties/beats.file-property.ts says. So the pictured entries on beats 1, 2, 4, 6, 7, 8 and 10 were dropped from the beats file. The images and the chapter page cover and scenes survived. Only the beat records went.\n\nThe prompt and the advance disagree. Either the advance should merge, keeping every picture before the first moved beat, which matches the role rule that each beat before the first one moved keeps what was settled on it, or the prompt should ask for the whole set.\n\nWorked around: I asked the recorder to put the seven entries back itself with a change to the beats file, from the full 17-line file it kept. The memory recorder may have hit the same thing with memory: the role says beats before the first moved beat keep their memories, and I have not checked whether the memory on beats 1 to 14 survived.\n",
} as const satisfies AgentMessage
