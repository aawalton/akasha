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
        "Every cgroup keeps a lifetime peak in memory.peak and nothing reads it, so a restart throws it away. Per kind there is no number at all until each kind has a cgroup of its own. Host is 62.2 GiB with 80 GiB swap; the sixteen seat scopes peak at 32.2, 31.7, 28.8, 26.8, 22.7, 18.6, 9.2, 8.6, 7.8, 6.3, 5.3, 3.7, 3.6, 3.5, 3.0 and 1.7 GiB, and app.slice as a whole peaked at 55.5 GiB. Alan wants the log pattern check performance uses.\n",
    },
  ],
  constraints: ["Every ceiling number is settled with Alan rather than chosen."],
} as const satisfies Initiative
