import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMovesMeBetweenThem = {
  id: "01a0c59a-a8dd-7b3f-b702-726c2de69d6f",
  type: "page-type/all-about-alan-topic",
  slug: "what-moves-me-between-them",
  title: "What Moves Me Between Them",
  definition: "boredom as the needle switching me between my agents and the game",
  parents: ["all-about-alan-topic/how-i-watch-my-agents"],
  related: [
    "all-about-alan-topic/how-stimulated-i-am",
    "all-about-alan-topic/how-much-attention-i-have",
  ],
  settled:
    "Boredom is what moves me. I transition when I am bored, and nothing else paces it.\n\nWhile the agents hold me, with a question to answer or something to decide, I stay on the agents. When all of them are working and there is nothing for me, I go back to the game until the next loading screen. The loading screen is when I check whether they need me again.\n\nSo the agents are the primary thing and the game is the filler, rather than the other way round.\n\nBoredom is an error signal with two ways to burn off. One is the game. The other is starting a new project, where there is a free slot among the twelve, so idle time turns straight into more work in flight.\n\nThat is part of why the number runs high. Enough live streams and something usually wants me, which keeps me out of an understimulated trough. A new team is a knob the same way the game and the music are.\n\nEvery slot already passed the importance test to exist, so letting boredom pick which one I touch next costs me nothing.",
} as const satisfies AllAboutAlanTopic
