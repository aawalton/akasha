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
        "The place, the module, the hook, the readers and the warrants all stand, and the old store is gone. Proven by hand: a start payload lands the page, a stop payload takes it away, and a subagent under this seat owes its assignment and its own type and nothing of its seat's persona or role or person. Unproven: the fields a live `SubagentStart` carries, which are taken from what the old hook read, and a hook binds only from the next seat spawned after it landed.",
    },
  ],
} as const satisfies Initiative
