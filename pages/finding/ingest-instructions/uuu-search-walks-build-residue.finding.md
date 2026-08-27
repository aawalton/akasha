---
id: 88ce2f6b-dc17-5ac9-bc0c-4cf76b6c77a9
page-type-slug: finding
title: "Uuu search walks build residue"
domain-slug: domain/global
---

# Claim

An unscoped `rg -uuu` searches roughly eleven times more files than the same search with ignore rules on, and the extra files are build residue that also produces wrong answers. Measured in `~/code` on 2026-08-07: 16,471 files searched with ignore rules on, against 175,690 files present on disk for `-uuu` to walk — 59,170 of them under `node_modules`, 39,622 under `dist` or `build`, 1,548 inside `.git`. One such search was observed at 610% CPU while twenty agents shared a 24-core box.

# Evidence

Measured 2026-08-07 during the `dirty/` quarantine sweep.

THE COST. `rg --stats` in `~/code` reports 16,471 files and 138 MB searched with ignore rules on. `find . -type f` reports 175,690 files present, which is what `-uuu` walks: 59,170 under `node_modules`, 39,622 under `dist`/`build`, 1,548 in `.git`. Ratio 10.7x. Observed directly: `rg -uuu -l --glob '!.git/**' litrpg-games .` at 610% CPU in `ps`, while the one-minute load average read 92.45 on 24 cores with 21 agents live. The instructions repo is not the expensive case — the same unscoped search there walks 2,196 files in 0.054s — so the cost is invisible to anyone who tests the pattern where they are standing.

THE WRONG ANSWERS, from the same residue. Two seats reported it independently. One searched `~/code` for `classifyInstructionFile` under `-uuu` and got ten hits, every one in a `dist/` directory — untracked compiled leftovers of a package that had since been RENAMED. Read as live source they would have rescued a dead claim. Another searched for `agentType` and got hundreds of hits, all from `.claude/supervisors/*/supervisor.log`, where the tracked source says in comments that the attribute is deliberately not read. A third had every hit for two absence probes come back from a `.git/worktrees/*/index` binary. `git ls-files` settled all three.

WHY THE PATTERN SPREAD. The dispatch brief for this task told seats to use `rg -uuu` for any verdict resting on finding nothing, because bare `rg` drops gitignored and hidden files and had already produced a false absence. That guidance is correct for proving a thing is gone and it named no scope, so seats ran it from a repo root. The flag that makes a search honest about ignore rules is the same flag that fills it with build output.

NOT MEASURED: whether the same ratio holds in the other five repositories, and whether the 610% figure is typical or a tail case. One observation, not a distribution.
