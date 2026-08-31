import type { Initiative } from "../initiative.page-type.ts"

export const akashaSubagentReading = {
  id: "01a05324-954d-733a-a5d2-5404defb82b4",
  pageTypeSlug: "initiative",
  slug: "akasha-subagent-reading",
  domainSlug: "domain/akasha-required-reading",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "A subagent's page stands in akasha and nowhere else.",
      workingMemory:
        "The page type stands. Nothing writes a subagent page in either place: the harness registers `name-subagent` alone, so the three under `agent/subagent/` are stale while the readers of them run. Alan has approved a hook in akasha at `SubagentStart` and `SubagentStop`, which the client knows both of. Left: a module landing the page, that hook, the two readers in `subagent-page-read.ts` pointed at akasha, and the old place gone with the `files:` line enrolling it.",
    },
    {
      statement: "A subagent owes a set of warrants of its own rather than its seat's.",
      workingMemory:
        "`Warranting` takes a root, a path and a knowing, and no agent, so no warrant can branch on who asks. A subagent's id is its seat's followed by `--` and its own, which stands at no page, so `seatPathOf` answers null and `unheldIn` owes it nothing of its seat. Its read record is already its own. Meeting this changes `warranting`'s `An agent sitting at no seat owes nothing of one`.",
    },
    { statement: "A subagent owes the assignment its seat states." },
  ],
} as const satisfies Initiative
