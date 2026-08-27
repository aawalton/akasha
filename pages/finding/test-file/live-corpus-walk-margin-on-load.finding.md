---
id: 4a08ce8a-fa71-5ae8-a446-c866df21848e
page-type-slug: finding
title: "Live corpus walk margin on load"
domain-slug: domain/test-file
---

# Claim

The live-corpus seat-name walk in `packages/agents/shared/project-binding.unit.test.ts` spends one subprocess per domain per role, so what it costs grows with the domain corpus while its 240s budget does not. It passes or fails on how loaded the CI box is when it runs.

# Evidence

The test is `every dispatch seat the corpus can state composes a name that binds to its seq (live corpus)`. It walks every domain and calls `composeSeatName` once per role over `["manager", "developer"]`. Since the composition moved to the instructions repository that reaches it through `callSeatAt`, which spawns a process per call. At 406 documents under `domains/*.md` that is 812 spawns, one after another.

Three readings on 2026-08-14. Run alone in the #19152 worktree the whole file passed: 36 tests, 0 fail, 98.72s. In pipelines 28018 and 28021, both on project-19152, the test was ejected at 240000.09ms and 240000.08ms against a `LIVE_WALK_TIMEOUT_MS` of 240_000, in a phase the runner reports as concurrent across 270 shards. Pipeline 28022 on main passed in that same phase within the hour.

So it is not failing everywhere, and it is not a test failing for no reason: it uses about 40% of its budget with the machine to itself, and what decides it is what the other shards leave. Both failures fell while I was running checks back to back on the same host.

Two things narrow the margin and neither reads as a defect. The corpus grows — `de3a3dded` alone wrote 79 files — each new domain adding two spawns to a fixed budget. And CI getting busier does the same, which #19152 will cause by letting wedged pipelines run.

The test earns its place, and its own comment says why: held over the live corpus, a domain slug landing tomorrow whose shape defeats the anchor fails on the commit that lands it, where a fixture would not. The cost is in the shape of the asking rather than in what is asked — 812 spawns of one tool, each loading the same corpus, to answer 812 questions about it.

NOT MEASURED: how long one spawn takes under contention, against the ~120ms the local total implies. I never reproduced a timeout myself — I ran the file alone, where it passed, and read the failures from the pipelines. I have not swept for other walks of this shape, nor priced a batch form.
