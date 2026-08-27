---
id: a4fd8428-faec-5c24-8fc3-79c1a97930a3
page-type-slug: finding
title: "Agents tree undrained"
domain-slug: domain/agent-harness
---

# Claim

Nothing drains `~/agents` any more. The orphan name-directory pass was the last thing that removed a seat's leftover directory, and `#17730` deleted it because it identified a directory's owner by parsing the name — the very reading that row existed to remove. The tree holds 2.4 GB over 710 directories, 303 of them dispatch-shaped leftovers.

# Evidence

`packages/agents/shared/agent-terminal-reaper-orphan-dir.ts` is gone as of `#17730`, verified 2026-08-04: no file under `packages/agents/shared/` matches `terminal-reaper`, and `ops seat reap --dry-run --json` runs with `orphanWorkerDirs` absent from its shape. Its companion live-process pass went with `#17621`.

The deletion was correct on its own terms and the delivering seat measured it before acting: the pass scanned 303 directories and reaped 0, every candidate failing the terminal-project gate, and 141 of the 190 project rows those directory names point at no longer exist. No store can supply the seq, because the agent rows that recorded these directories were hard-deleted on 2026-08-04. Re-gating the pass on whether a live seat holds the name would have removed 302 directories on the next supervisor boot.

What is left is the hygiene rather than the parse. `ops seat reap` still reaps directories it can attribute to an agent row — 5 scanned, 5 kept on the run above — but the 303 with no surviving row are unreachable by it. A replacement wants a gate that reads a directory's age and whether any live row claims it, never its name.
