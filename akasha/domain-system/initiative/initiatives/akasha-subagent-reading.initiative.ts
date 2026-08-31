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
        "The place, the module, the hook, the readers and the warrants stand, and the old store is gone. Read out of the client: a start names the subagent's own id under `agent_id` and its kind under `agent_type`, which is what the hook reads. Both events derive into the registration. Unbound: no seat has spawned since the hook landed. Open: a seat dying with a subagent out restarts carrying that page, and the page refuses its next stop until forced.",
    },
  ],
} as const satisfies Initiative
