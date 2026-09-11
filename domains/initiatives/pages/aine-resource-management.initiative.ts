import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aineResourceManagement = {
  id: "01a09140-cf1e-779f-aeea-831ac4709019",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aine-resource-management",
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
        "The kinds are a change, a guard, a check, an audit, a test, a deploy, a command, and a bash call that is none of these. A seat's ceiling bounds the seat and nothing inside it, so one runaway takes the whole seat's allowance. Commands, checks, changes and the testing system are already domains a ceiling can be stated on. No page holds an audit, a deploy or a guard, and a bash call an agent writes has no page at all, which makes it the hard one.",
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
    {
      statement: "Every runtime on the workstation has a heap ceiling below its work's ceiling.",
      workingMemory:
        "A runtime allowed to grow past its cgroup dies mid-collection rather than being refused, so the runtime's own ceiling is the one that really bounds the work. NODE_OPTIONS is --max-old-space-size=61440 in the Claude settings file, a 60 GiB heap on a 62.2 GiB host, which bounds nothing. Python has no heap ceiling of its own at all, which is why the 16 GiB script Alan killed by hand had nothing above it but the reaper.\n",
    },
    {
      statement: "An agent may surge well past its usual share, and the host absorbs the surge.",
      workingMemory:
        "Alan asked for a rare surge to be the standard case rather than an exception. The sixteen seat scopes have lifetime peaks adding to 213.5 GiB while app.slice, their parent, peaked at 55.5 GiB, so the surges do not coincide by about four to one. The answer is two numbers per agent rather than one: a share reclaim cannot take, and a burst ceiling far above it. Shares add to the host, ceilings deliberately do not. 80 GiB of swap is what makes a rare collision survivable.\n",
    },
    {
      statement: "A surge the host cannot absorb ends a tree rather than ending the host.",
      workingMemory:
        "Absorbing means reclaim, throttling and swap. Where those are spent something ends, and the choice is one tree or the whole workstation. Today nothing ends until MemAvailable and SwapFree are both under 4 GiB, and with 80 GiB of swap that moment arrives long after the machine is unusable, which is why Alan killed the 16 GiB python by hand. Ending is the last resort rather than the first, and takes as little as gives the host its headroom back.\n",
    },
    {
      statement: "Which tree is ended first is settled before the host runs short.",
      workingMemory:
        "The reaper takes whichever subtree is largest at the instant it looks, so a browser, a game and a build all weigh the same, and the largest is often the one doing the most valuable work. Kubernetes settles this in advance by class. Overcommit only works where the rare collision resolves the way Alan would choose, so the order belongs settled while nothing is burning.\n",
    },
    {
      statement: "A host short of memory is known from how long its programs stall.",
      workingMemory:
        "Cannot absorb has no honest definition without this. MemAvailable and SwapFree describe what could be had rather than whether anything is hurting, and the reaper reads both. The kernel publishes stall time per cgroup at /proc/pressure/memory, and systemd-oomd is built on it. Without it the last resort is a byte threshold again, which is what let the machine become unusable while 54 GiB of swap was still free.\n",
    },
    {
      statement:
        "Every agent and every service on the workstation runs under a stated share of the processor.",
      workingMemory:
        "A share costs nothing while the machine is quiet and decides who goes first while it is busy, which is what makes interactive work win against a build. seat-launching states CPUWeight=100 and CPUQuota=800%, and both reach only the scope that begins the tmux server. The other sixteen seats run in pane scopes tmux made, with CPUQuotaPerSecUSec=infinity. The host has 24 processors and nothing on it has ever been throttled.\n",
    },
    {
      statement: "The work a seat starts is weighed as part of that seat rather than beside it.",
      workingMemory:
        "A run given a processor ceiling gets a group under the nearest ancestor where processor time is delegated. A seat's scope is a leaf and delegates nothing, so the group lands in app.slice beside every seat at the same weight 100, and a seat with three bounded runs pulls four shares where a quiet seat pulls one. Delegating processor time below a seat's scope is what would let the group be made inside it.\n",
    },
    {
      statement: "A seat is bounded by its share rather than by a ceiling.",
      workingMemory:
        "seat-launching states CPUQuota=800%, it reaches one seat of seventeen, and nothing on the host has ever been throttled. A ceiling holds even where every other core is idle, so on a 24 processor machine that is usually not full it can only make Alan wait longer for a seat he is waiting on. A share is free while the machine is quiet and divides fairly while it is busy, which is the whole job.\n",
    },
    {
      statement:
        "Every kind of work an agent starts is stopped at an elapsed time as well as at a processor time.",
      workingMemory:
        "The same eight kinds. maxCpuSeconds is judged by ranOver and refuses with check-over-its-ceiling. maxWallSeconds and maxMemoryMb are declared beside it on module-property-group and on code-file-property, read by no code, and no page states either. A run blocked on a network call or on a lock spends no processor seconds, so the one ceiling enforced never ends it however long Alan waits on it.\n",
    },
    {
      statement: "What each kind of work spent is recorded beside the page of what ran.",
      workingMemory:
        "check-cost already does this for four of the eight: a check and an audit through checking, a command through calling, a change through change-running and apply-running. Each writes one jsonl line carrying cpuSeconds, childCpuSeconds, wallMs and the memory peak, beside the page of what ran, uncommitted and rolling at 8 MiB. A guard, a test, a deploy and a bash call record nothing, which is why half the ceilings would be guesses.\n",
    },
  ],
  constraints: ["Every ceiling number is settled with Alan rather than chosen."],
} as const satisfies Initiative
