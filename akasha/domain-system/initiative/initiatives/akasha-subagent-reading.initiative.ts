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
      statement: "A subagent stands as a page in the akasha folder.",
      workingMemory:
        "Three subagent pages stand under `agent/subagent/` as markdown, and their type stands at `pages/page-type/subagent.page-type.md` extending a page type `agent` that akasha carries no equal of. Nothing in akasha holds a subagent today.",
    },
    { statement: "A subagent's page is written in akasha as well as where it stands today." },
    { statement: "What reads a subagent reads the page in akasha alone." },
    { statement: "What writes a subagent writes the page in akasha alone." },
    { statement: "No subagent page stands outside the akasha folder." },
    {
      statement: "A subagent owes a set of warrants of its own rather than its seat's.",
      workingMemory:
        "`Warranting` takes a root, a path and a knowing, and no agent, so no warrant can branch on who asks. A subagent's id is its seat's followed by `--` and its own, which stands at no page, so `seatPathOf` answers null and `unheldIn` owes it nothing of its seat. Its read record is already its own. Meeting this changes `warranting`'s `An agent sitting at no seat owes nothing of one`.",
    },
    { statement: "A subagent owes the assignment its seat states." },
  ],
} as const satisfies Initiative
