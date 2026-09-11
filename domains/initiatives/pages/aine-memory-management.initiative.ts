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
    {
      statement: "Every kind of work an agent starts runs under a ceiling of its own.",
      workingMemory:
        "A seat's ceiling bounds the seat and nothing inside it, so one runaway takes the whole seat's allowance. Each kind states its own: a command, a check, a test run, a change, an audit, a deploy, and a tool call that is none of these. Commands, checks, changes and the testing system are already domains a ceiling can be stated on. No page yet holds an audit or a deploy.\n",
    },
    {
      statement: "The most memory each kind of work has taken is recorded.",
      workingMemory:
        "The pattern is check-cost: one jsonl line per run beside the page of what ran, uncommitted, rolling into a numbered part at 8 MiB. Its record already carries peakBytes, residentBeforeBytes, peakAddedBytes and peakMeasured, read from VmHWM after refs are cleared. Checks are measured already, commands and changes record under entries, and every other kind records nothing. A group may state max-memory-mb and nothing reads it.",
    },
    {
      statement: "The workstation keeps memory for itself that no agent can take.",
      workingMemory:
        "app.slice peaked at 55.5 GiB of 62.2, leaving 6.7 GiB for the kernel, the compositor and everything outside it, and nothing reserves that. A ceiling on each seat does not give it either, since sixteen seats each under a fair ceiling still add to more than the host has. MemoryMin on the system's own units protects a reserve from reclaim, and a MemoryMax on app.slice caps what agents can collectively reach.\n",
    },
  ],
  constraints: ["Every ceiling number is settled with Alan rather than chosen."],
} as const satisfies Initiative
