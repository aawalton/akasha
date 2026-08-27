---
id: 34182de9-2bfd-57f4-83b4-f74c15a18da3
page-type-slug: finding
title: "Small seat reached the tree ceiling"
domain-slug: domain/agent-fleet
---

# Claim

A memory-reaper per-tree kill took a seat whose context was small and whose age was under twelve minutes, at the instant three background subagent completions landed together — so the per-tree ceiling can be reached by something other than context ingest, and the datum showing it is one no exit record carries. One specimen. What it asks for is conditional: a second kill with this signature makes it an upstream repro, and until then nothing should be built for it.

# Evidence

Carried out of `dirty/skills/agent-harness/findings/seat-liveness-halting-and-stalls.md` on 2026-08-07 while emptying that source, which is now removed. The observation is `athena`'s, reported 2026-07-27 from project row #15696; the machinery below I re-checked against `~/code` today.

THE SPECIMEN. 2026-07-18T05:25Z, memory-reaper per-tree kill on seat `ryn`: tree RSS 24.2 GiB at age 11m37s, main claude 2.1.198 (pid 2261632) at 23.1 GiB.

NOT CONTEXT INGEST, established from the transcript (`7d2fde2a`): 660 KB across 200 lines, largest single entry 62 KB, no blob or psql reads. Tool activity was document reads plus Agent-tool vocabulary scouts (43 KB reports); the tree included an idle playwright MCP.

THE COINCIDENCE. The death instant matches three background subagent task-notifications enqueued together — 05:25:14.798, .799 and .823. The kill lands at the multi-completion ingest moment. The hypothesis athena drew from it, in-CLI heap amplification when several background subagent completions arrive at once, is upstream Claude Code internals and is explicitly not observable from outside the process.

STILL LIVE. `MAX_TREE_RSS_GB = 24` at `packages/shared/utils/system/src/memory-monitor/per-tree.ts:3`, and `assessTreeKills` is the per-supervisor-tree leg named at `memory-monitor.ts:6`. The ceiling the specimen reached is the ceiling standing today.

WHY NO INSTRUMENT WOULD HAVE PRODUCED THIS. `agent.exit`'s `hostMemory` carries host MemAvailable, swap and PSI at the detection instant, and no RSS of the dead process. The per-process figure this specimen turns on is exactly what that payload does not have. The datum came from the reaper, which was present at the kill.

BOUND. One specimen is evidence that instances exist and says nothing about how many remain. Nothing here is a rate.
