import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theScaffoldingIBuilt = {
  id: "01a06559-9d65-7ec9-b3bf-87a17dee0c36",
  type: "page-type/all-about-alan-topic",
  slug: "the-scaffolding-i-built",
  title: "The Scaffolding I Built",
  definition: "the twenty years of structure I run on, holding what my head cannot",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/how-i-get-anything-done",
    "all-about-alan-topic/how-i-remember-anything",
    "all-about-alan-topic/how-i-watch-my-agents",
    "all-about-alan-topic/playing-the-long-game",
  ],
  settled:
    "I am the agent and the system around me is the harness. Every tool in it is a part, not the thing.\n\nIt grows by adding rather than replacing, and a layer gets built when something buckles.\n\nTwenty years produced two permanent organs, one on what I can track and one on what I can carry.\n\nThe two are wired together: clearing the queues lifts my safety, and low safety piles them up and drags it lower.\n\nThe task half lives in software now, a set of streams I push things out of my head into.\n\nIt runs on the same cue chain I remember anything with: the state of the system says what to do next, and doing that puts the system in the state that says what to do after. It does not rely on bounds.\n\nI work against it the way a stateless server works against its store. The teams hold what a piece of work is up to. I serve whatever asks for me and then go back to the game, keeping nothing between requests.",
} as const satisfies AllAboutAlanTopic
