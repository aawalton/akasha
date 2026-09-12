import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandsCleanup = {
  id: "01a090f2-adc6-7386-822a-75bf754f4425",
  type: "initiative",
  slug: "athena-commands-cleanup",
  domain: "page-type/command",
  persona: "athena",
  intents: [],
  constraints: [
    "Every landing in this repository runs through the command system, so a fault landed here stops every agent at once.",
    "Only the coordinating seat runs `akasha audit`, so a subagent cannot judge against a check what that subagent read.",
    "The coordinating seat hands each intent to a subagent and works no intent itself.",
    "Up to twenty subagents work at once.",
    "An intent whose next move is unclear has that question written into its working memory, and the work goes on.",
    "The work goes on until every intent left on a child initiative is blocked on Alan.",
    "A subagent lands its own change, and the coordinating seat keeps the child pages.",
    "A spelling two arguments share is settled by Alan rather than by whichever agent lands on it first.",
    "A command's name is spelled in Alan's aliases and in the editor extension, both inside this repository, so a rename lands there in the same change and reaches Alan's machine at the next deploy.",
    "A claim that a file changed is settled by reading that file at HEAD, rather than by the commit that claims it.",
    "A page and the code beneath it drift in both directions, so a sweep reads both rather than trusting either.",
    "Every question for Alan waits for the end of the work and is written into the working memory of the intent it belongs to.",
    "A change is judged before the hold is taken, so a landing over hundreds of files costs collision surface rather than a hold on the swarm.",
    "A check blind to a class of file steers the swarm away from that class rather than leaving it undone, because agents work the refusals they can see.",
    "A namespace whose survey shows one or two stragglers usually holds a shared reader the survey cannot see, and the straggler is bait.",
  ],
} as const satisfies Initiative
