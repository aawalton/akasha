---
id: 88ce2f6b-dc17-5ac9-bc0c-4cf76b6c77a9
slug: uuu-search-walks-build-residue
page-type-slug: finding
title: "Uuu search walks build residue"
domain-slug: domain/global
---

# Claim

An unscoped `rg -uuu` searches roughly eleven times more files than the same search with ignore rules on, and the extra files are build residue that also produces wrong answers. Measured on 2026-08-07 in the code repository the akasha repo has since replaced: 16,471 files searched with ignore rules on, against 175,690 files present on disk for `-uuu` to walk — 59,170 of them under `node_modules`, 39,622 under `dist` or `build`, 1,548 inside `.git`. One such search was observed at 610% CPU while twenty agents shared a 24-core box.

# Evidence

Measured 2026-08-07 during the `dirty/` quarantine sweep.

THE COST. `rg --stats` reported 16,471 files and 138 MB searched with ignore rules on. `find . -type f` reported 175,690 files present, which is what `-uuu` walks: 59,170 under `node_modules`, 39,622 under `dist`/`build`, 1,548 in `.git`. Ratio 10.7x. Observed directly: `rg -uuu -l --glob '!.git/**' litrpg-games .` at 610% CPU in `ps`, while the one-minute load average read 92.45 on 24 cores with 21 agents live.

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`, the one repository the estate now stands in. `rg --stats` with ignore rules on searches 94,304 files and 1.16 GB. `find . -type f` reports 273,563 files present for `-uuu` to walk: 94,522 under `node_modules`, 43,373 under `dist`/`build`, 81,935 in `.git`. Ratio 2.9x rather than 10.7x, and the residue is still the majority of the difference. The cheap case a seat might test the pattern against is gone — every search now runs where the residue is.

THE WRONG ANSWERS, from the same residue. Two seats reported it independently. One searched `~/code` for `classifyInstructionFile` under `-uuu` and got ten hits, every one in a `dist/` directory — untracked compiled leftovers of a package that had since been RENAMED. Read as live source they would have rescued a dead claim. Another searched for `agentType` and got hundreds of hits, all from `.claude/supervisors/*/supervisor.log`, where the tracked source says in comments that the attribute is deliberately not read. A third had every hit for two absence probes come back from a `.git/worktrees/*/index` binary. `git ls-files` settled all three.

WHY THE PATTERN SPREAD. The dispatch brief for this task told seats to use `rg -uuu` for any verdict resting on finding nothing, because bare `rg` drops gitignored and hidden files and had already produced a false absence. That guidance is correct for proving a thing is gone and it named no scope, so seats ran it from a repo root. The flag that makes a search honest about ignore rules is the same flag that fills it with build output.

NOT MEASURED: whether the 610% figure is typical or a tail case. One observation, not a distribution.
