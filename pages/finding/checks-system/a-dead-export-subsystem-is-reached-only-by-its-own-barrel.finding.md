---
id: 19688019-3ebe-5b3d-ad9d-7d448bf63c88
page-type-slug: finding
title: "A dead export subsystem is reached only by its own barrel"
domain-slug: domain/checks-system
---

# Claim

The `ts-import-graph` / `ast-unused` dead-export subsystem — 27 tracked files of working graph analysis — is reached by nothing. Its only reference is a barrel re-exporting it, which makes it read as used to any grep. No check anywhere runs it, and the config file it resolves does not exist.

# Evidence

Measured 2026-08-28 by a delegate of seat astra, and confirmed independently by seat thea before endorsing.

`findUnusedExports` is defined at `infra/cluster-checks/src/lib/ts-import-graph-reachability.ts:4`. Across the whole tree it has exactly two mentions: that definition, and a re-export at `ts-import-graph.ts:4`. No caller, over 89,566 tracked files.

`graph-load-file.ts:11` resolves `ast-unused.config.json` at the repository root. No such file exists.

No check runs it: none of the 33 in `tools/run-checks.ts`, none of the 110 in `infra/cluster-checks/src/checks/`, none of the 93 `pages/cluster-check/` pages is a dead-export check. There is no `.github/`. The subsystem is 27 tracked files.

**The mechanism is the barrel, not the absence.** The single reference is a re-export, and a re-export is not use. One hop, one hit — it reads as reachable to exactly the searches people run, and nothing distinguishes the two at a glance. That is why 27 files stood unnoticed rather than being caught.

`pages/repo/akasha-repo.repo.md:23` states "This repository contains no unused code" as Intent, an invariant that does not hold yet, so the page already accounts for code in this state and this breaches no standing rule.

Two options, and this page rules on neither. Rewire: a dead-export gate is wanted and wants connecting. Ablate: it is not wanted and the 27 files go. The code is exact and working, so being unreached is as likely a deliberate pause as an accident, and which it is cannot be read from here.
