import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aineResourceManagement = {
  id: "01a09140-cf1e-779f-aeea-831ac4709019",
  type: "initiative",
  slug: "aine-resource-management",
  domain: "domain/memory",
  persona: "aine",
  intents: [
    {
      statement: "Every test file an agent runs has a memory ceiling of its own.",
      workingMemory:
        "A test file is held to five processor seconds and 128 megabytes, both stated on code-file-property and read by code-tests. A run sits in a leaf of its own group and what it starts sits beside it, so the seconds and peak recorded carry everything that file started. The ceiling reclaims and slows rather than ending a run, so a file wanting more pays in processor seconds instead, and only the processor ceiling is judged. Of 1700 test files, 207 sit against the ceiling.",
    },
    {
      statement: "Every change an agent runs has a memory ceiling of its own.",
      workingMemory:
        "A change is held to three hundred processor seconds by ALLOWED_CPU in change-ceiling, which a change page overrides by stating maxCpuSeconds of its own. Nothing states a memory ceiling. A change runs inside the command process, so the peak recorded is that whole process's high water mark rather than the change's own. One draft of sort-property-values-on-every-page reached 24.0 GiB, and nothing above it refused that run.",
    },
    {
      statement: "Every check an agent runs has a memory ceiling of its own.",
      workingMemory:
        "Fifty-eight of the fifty-nine code checks state maxCpuSeconds of their own, usually ten seconds and up to thirty, and ranOver judges cpuSeconds plus childCpuSeconds once the run ended. Nothing states a memory ceiling. A check runs inside the checking process, and the peak recorded is that process's high water mark, forgotten before each check and so counted from what the process already held rather than from nothing.",
    },
    {
      statement: "Every audit an agent runs has a memory ceiling of its own.",
      workingMemory:
        "An audit is a check over the whole tree rather than over what changed, and states a processor ceiling of its own: fifteen seconds usually, twenty for no-relative-specifier, twenty-five for check-reaches-a-path-through-the-index, and a hundred and twenty for no-unused-exports and for index-is-level-with-the-pages. Nothing states a memory ceiling, and the peak is taken the way a check's is.",
    },
    {
      statement: "Every guard a tool call runs has a processor and a memory ceiling of its own.",
      workingMemory:
        "A guard is an agent hook, and hook-dispatch spawns each one and records a cost row against that hook's page. No hook states either ceiling and nothing judges the run. The seconds recorded are the dispatcher's child seconds and so the guard's, while the peak is the dispatcher's own mark rather than the guard's. A guard runs on every tool call of every seat. clear-reads sweeps the read record at every session start, opening 35,216 files in 31,591 folders to read one moment from each.",
    },
    {
      statement: "Every deploy an agent runs has a processor and a memory ceiling of its own.",
      workingMemory:
        "The deploy command records one cost row against the page it put up and states neither ceiling, so a deploy is measured and never judged. A dry run records nothing. A deploy reaches a machine rather than the repository, so a run past a ceiling has already left its work on that machine, and refusing what the run answered undoes none of it.",
    },
    {
      statement: "Every command an agent runs has a processor and a memory ceiling of its own.",
      workingMemory:
        "Calling records one cost row against the command's page and states neither ceiling. The command process is what a change runs inside, so a command's peak already counts the change's, and holding both to a ceiling weighs the same bytes twice. The commands that run long are the ones carrying a change.",
    },
    {
      statement:
        "Every bash call that is none of these has a processor and a memory ceiling of its own.",
      workingMemory:
        "weigh-bash-call records what the shell's exit trap leaves, and states neither ceiling. A call killed part way still leaves its peak, which is how the 24.0 GiB run was found with no change row beside it. Nothing above a bash call reaches it: the reaper weighs one process against 32 GiB, and its host leg waits for MemAvailable and SwapFree to be under 4 GiB each.",
    },
    {
      statement: "Every kind of work an agent starts is stopped at an elapsed ceiling of its own.",
      workingMemory:
        "The same eight kinds. maxWallSeconds is declared beside maxCpuSeconds and maxMemoryMb on module-property-group and on code-file-property, read by no code, and no page states one. A run blocked on a network call or on a lock spends no processor seconds and takes no more memory, so neither other ceiling reaches it however long Alan waits. A run that never ends is never judged, so this ceiling stops the run rather than judging it afterwards.",
    },
    {
      statement: "The workstation keeps memory for itself that no agent can take.",
      workingMemory:
        "app.slice peaked at 55.5 GiB of 62.2, leaving 6.7 GiB for the kernel, the compositor and everything outside it, and nothing reserves that. A ceiling on each seat does not give it either, since sixteen seats each under a fair ceiling still add to more than the host has. MemoryMin on the system's own units protects a reserve from reclaim, and a MemoryMax on app.slice caps what agents can collectively reach.\n",
    },
    {
      statement:
        "Every agent, service and container on the workstation has a stated memory ceiling.",
      workingMemory:
        "Nothing states one. seat-launching sets CPUWeight and TasksMax and no memory setting, service-workstation models no memory property, and both podman containers answer 0 for their memory limit. The only live guard is memory-reaper, weighing every uid-1000 process every ten seconds against a 32 GiB resident ceiling, so a runaway holds half the host before anything reaches it. A required field carries its own enforcement: a unit stating no ceiling is refused rather than left unbounded.",
    },
    {
      statement:
        "An agent may surge well past the memory kept for it, and the host absorbs the surge.",
      workingMemory:
        "Alan asked for a rare surge to be the standard case rather than an exception. The sixteen seat scopes have lifetime peaks adding to 213.5 GiB while app.slice, their parent, peaked at 55.5 GiB, so the surges do not coincide by about four to one. The answer is two numbers per agent rather than one: a share reclaim cannot take, and a burst ceiling far above it. Shares add to the host, ceilings deliberately do not. 80 GiB of swap is what makes a rare collision survivable.\n",
    },
    {
      statement:
        "Every runtime on the workstation has a heap ceiling below its work's memory ceiling.",
      workingMemory:
        "A runtime allowed to grow past its cgroup dies mid-collection rather than being refused, so the runtime's own ceiling is the one that really bounds the work. NODE_OPTIONS is --max-old-space-size=61440 in the Claude settings file, a 60 GiB heap on a 62.2 GiB host, which bounds nothing. Python has no heap ceiling of its own at all, which is why the 16 GiB script Alan killed by hand had nothing above it but the reaper.\n",
    },
    {
      statement: "A host short of memory is known from how long its programs stall.",
      workingMemory:
        "Cannot absorb has no honest definition without this. MemAvailable and SwapFree describe what could be had rather than whether anything is hurting, and the reaper reads both. The kernel publishes stall time per cgroup at /proc/pressure/memory, and systemd-oomd is built on it. Without it the last resort is a byte threshold again, which is what let the machine become unusable while 54 GiB of swap was still free.\n",
    },
    {
      statement: "A surge of memory the host cannot absorb ends a tree rather than the host.",
      workingMemory:
        "Absorbing means reclaim, throttling and swap. Where those are spent something ends, and the choice is one tree or the whole workstation. Today nothing ends until MemAvailable and SwapFree are both under 4 GiB, and with 80 GiB of swap that moment arrives long after the machine is unusable, which is why Alan killed the 16 GiB python by hand. Ending is the last resort rather than the first, and takes as little as gives the host its headroom back.\n",
    },
    {
      statement: "Which tree is ended first is settled before the host runs short of memory.",
      workingMemory:
        "The reaper takes whichever subtree is largest at the instant it looks, so a browser, a game and a build all weigh the same, and the largest is often the one doing the most valuable work. Kubernetes settles this in advance by class. Overcommit only works where the rare collision resolves the way Alan would choose, so the order belongs settled while nothing is burning.\n",
    },
  ],
  constraints: [
    "Adding a mechanism requires Alan's approval.",
    "Setting specific numbers requires Alan's approval.",
  ],
} as const satisfies Initiative
