---
id: e2f84482-2a04-5046-bddc-0190c04aa7d6
page-type-slug: finding
title: "Obligation gate suite passes alone"
domain-slug: domain/global
---

# Claim

`move-to-obligation-gate.integration.test.ts` fails under the full slow-suite gate and passes on its own, at the same commit, in both an untouched tree and a feature worktree.

# Evidence

Observed on 2026-08-15 from `ops project check --seq 18909`, over 429 of 430 selected slow suites at `d7d4877a` on `project-18909`, 0 behind `origin/main` at `9787854eb6`. Three of the file's cases failed and the gate refused before branch CI was minted.

The two failure texts do not describe one defect. The first is a refusal — `refusing to move project #19181: awaiting_manager_seat is not on the singleton ladder` — where the test expects the move to land. The second is an absence — `no document at projects/19181.md` and `project not found: #19181` — where the row the earlier case created is gone by the time a later case reads it.

Run alone the same file is green three ways, each measured rather than assumed: 19 pass, 0 fail in the `project-18909` worktree at `d7d4877a`; 19 pass, 0 fail through `ops worktree ephemeral --ref origin/main` at `9787854eb6`, which is the commit the failing gate was 0 behind. The feature branch touches no file under `packages/alanwalton/projects`.

The suite writes real `project` rows and reads the `project-status` pages, both of which every other seat on this workstation is writing at the same time, and seq `19181` is a fixed literal rather than one minted per run. What separates a contended shared row from a defect in the gate is not readable from the gate's own output.
