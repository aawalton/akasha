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
        "No ceiling number is defensible without this. Nothing today records what a build, a test run or a check actually reaches, so every number would be a guess. A soft ceiling gathers it without risk: MemoryHigh throttles and reclaims rather than killing, and every breach lands in the cgroup's memory.events. A measured peak times a safety factor is how a hard ceiling is set afterwards.\n",
    },
    {
      statement: "Every runtime on the workstation has a heap ceiling below its work's ceiling.",
      workingMemory:
        "A runtime allowed to grow past its cgroup dies mid-collection, and the ceiling it holds is the one that actually bounds it. The node heap is set to 61440 MiB on a 62 GiB host, which bounds nothing. Python has no heap ceiling of its own at all, which is why the 16 GiB script Alan killed by hand had nothing above it.\n",
    },
    {
      statement: "How many agents run at once is bounded against what each of them may take.",
      workingMemory:
        "Per-worker peak times worker count is the number that reaches the host, so a ceiling on one bounds nothing without a ceiling on how many. Subagent fan-out is capped at 65 today, chosen against nothing.\n",
    },
    {
      statement: "Every limit the workstation holds is listed in one place.",
      workingMemory:
        "The live ones are scattered: the reaper's two ceilings in its own modules, the oomd thresholds in a unit drop-in, the node heap in the Claude settings file, the admission guard's free-memory minimum in a module of its own, and whatever cgroup files the units leave at max. Nothing reads them together, so no one of them can be set against the rest.\n",
    },
  ],
  constraints: ["Every ceiling number is settled with Alan rather than chosen."],
} as const satisfies Initiative
