import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const dallaResourceManagement = {
  id: "01a09140-cf1e-779f-aeea-831ac4709019",
  type: "page-type/initiative",
  slug: "dalla-resource-management",
  domain: "domain/memory",
  persona: "persona/dalla",
  intentStack: [
    {
      statement: "Every check an agent runs has a memory ceiling of its own.",
      workingMemory:
        "peakAddedBytes is measured for every check: the process's high-water mark is cleared before each check runs and what the check added above the resident mark is recorded, 2,997 of 2,997 rows measured. check.maxMemoryMb is declared, shown by `measure check` as a limit, and judged by nothing — ranOver judges processor seconds alone. Measured p95: no-unused-modules 842 MiB, typecheck 228, page-matches-its-type 30, relation-resolves 24, folder-matches-a-shape 21, the other 50 checks under 16.",
    },
    {
      statement: "Every audit an agent runs has a memory ceiling of its own.",
      workingMemory:
        "None of the 64 audits carries maxMemoryMb, so nothing states one. Measured peaks in the pod run 129 MiB to 2,286: index-is-level-with-the-pages 2,286, typecheck 1,496, no-unused-modules 1,325, folder-matches-a-shape 1,288, most under 400. The floor is the whole-tree read, which costs 327 MiB on its own. Processor ceilings are stated, fifteen seconds usually and up to a hundred and twenty.\n",
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
      statement:
        "A run of a code file stops at the processor and memory ceilings its property states.",
      workingMemory:
        "A test file states 5 processor seconds and 512 MiB. check-measuring and checking read those ceilings only after a run, comparing what it spent and refusing it for going over. Nothing starts the run under a limit: no prlimit, RLIMIT_CPU or systemd-run is set anywhere, so a test that loops or balloons runs until something else ends it and is only then refused.",
    },
    {
      statement:
        "`email-address-is-well-formed` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`no-color-literal` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`no-second-spelling-of-a-name-format` runs under a processor ceiling matched to its cost.",
    },
    {
      statement: "`identifier-names-one-page` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`no-import-cycle` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`restatement-narrows-something` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`key-names-one-property` runs under a processor ceiling matched to its cost." },
    { statement: "`page-matches-its-type` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`domain-is-named-by-a-parent` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`relation-resolves` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`repository-is-written-by-a-change` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`global-declared-once` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`manifest-names-what-is-reached` runs under a processor ceiling matched to its cost.",
    },
    {
      statement:
        "`extension-host-reaches-no-bun-code` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`lint-clean` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`browser-code-reads-the-environment-by-a-name` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`file-length` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`introduced-property-is-a-part` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`no-refused-syntax` runs under a processor ceiling matched to its cost." },
    { statement: "`shell-clean` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`command-is-named-by-its-place-in-the-tree` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`no-rule-in-two-files` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`popover-keeps-its-viewport-cap` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`folder-matches-a-shape` runs under a processor ceiling matched to its cost." },
    {
      statement:
        "`check-reaches-a-path-through-the-index` runs under a processor ceiling matched to its cost.",
    },
    { statement: "`typecheck` runs under a processor ceiling matched to its cost." },
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
      statement: "Which tree is ended first is settled before the host runs short of memory.",
      workingMemory:
        "The reaper takes whichever subtree is largest at the instant it looks, so a browser, a game and a build all weigh the same, and the largest is often the one doing the most valuable work. Kubernetes settles this in advance by class. Overcommit only works where the rare collision resolves the way Alan would choose, so the order belongs settled while nothing is burning.\n",
    },
    {
      statement: "A surge of memory the host cannot absorb ends a tree rather than the host.",
      workingMemory:
        "Absorbing means reclaim, throttling and swap. Where those are spent something ends, and the choice is one tree or the whole workstation. Today nothing ends until MemAvailable and SwapFree are both under 4 GiB, and with 80 GiB of swap that moment arrives long after the machine is unusable, which is why Alan killed the 16 GiB python by hand. Ending is the last resort rather than the first, and takes as little as gives the host its headroom back.\n",
    },
  ],
  constraints: [
    "Adding a mechanism requires Alan's approval.",
    "Setting specific numbers requires Alan's approval.",
  ],
} as const satisfies Initiative
