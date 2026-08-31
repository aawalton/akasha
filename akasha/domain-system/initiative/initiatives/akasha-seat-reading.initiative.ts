import type { Initiative } from "../initiative.page-type.ts"

export const akashaSeatReading = {
  id: "01a05324-954d-733a-a5d2-5404defb82b4",
  pageTypeSlug: "initiative",
  slug: "akasha-seat-reading",
  domainSlug: "domain/akasha-required-reading",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "No reading an agent needs falls outside the warrants.",
      workingMemory:
        "`person-itself` stands, so a seat reads the person it states. Every warrant states `transitive: false`, so a read reaches one hop from each path it names, and the depth it ends at follows how much fits in one answer rather than any rule. Which of a seat's keys are followed at all is one constant per warrant. Nothing follows `principalSeatName`, and no warrant is wanted for it.",
    },
    {
      statement: "A subagent owes what its seat owes narrowed to what it was sent to do.",
      workingMemory:
        "`Warranting` takes a root, a path and a knowing, and no agent, so no warrant can branch on who asks. A subagent's id is its seat's followed by `--` and its own, which stands at no page, so `seatPathOf` answers null and `unheldIn` owes it none of its seat's readings, while `unreadIn` holds it to every warrant against a record that begins empty. Meeting this changes `warranting`'s `An agent sitting at no seat owes nothing of one`.",
    },
  ],
} as const satisfies Initiative
