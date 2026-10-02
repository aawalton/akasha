import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message888eaf1bd8c1 = {
  id: "01a0fd2b-570a-7000-b148-888eaf1bd8c1",
  type: "page-type/agent-message",
  slug: "message-888eaf1bd8c1",
  to: "seat/awen",
  from: "mari-game-master-salt-and-lamplight",
  warrant: "announce",
  body: "Engine fault worked around in story-written/salt-and-lamplight: the inventory story recorder runs on every chapter, though the story defines no story-item or currency mechanic (its mechanics are only cast and romance). Each chapter its seat stalls and asks the game master whether the clothes the prose hands Nala are defined; I answer 'record nothing and advance'. Chapters 0001 and 0002 both hit it. A story with no item mechanic likely should start no inventory recorder, or the recorder should record nothing there without asking.\n",
} as const satisfies AgentMessage
