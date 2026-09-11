import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aineMemoryManagement = {
  id: "01a09140-cf1e-779f-aeea-831ac4709019",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aine-memory-management",
  domain: "domain/memory",
  persona: "aine",
  intents: [
    {
      statement:
        "Every agent and every service on the workstation runs under a stated memory ceiling.",
      workingMemory:
        "Nothing states one today. seat-launching sets CPUQuota, CPUWeight and TasksMax and no Memory* at all, and service-workstation models no memory property to state one in. The only live guard is memory-reaper, weighing every uid-1000 process every ten seconds against a 32 GiB resident ceiling, so a runaway holds half the host before anything reaches it. A required field carries its own enforcement: a unit stating no ceiling is refused rather than left unbounded.\n",
    },
  ],
} as const satisfies Initiative
