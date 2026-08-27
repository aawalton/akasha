---
id: 83433cfb-ca85-56fe-9504-151f359a3296
slug: moved-hooks-duplicated
page-type-slug: finding
title: "Moved hooks duplicated"
domain-slug: domain/agent-harness
---

# Claim

Thirteen hook scripts that #17766 moved into the instructions tree are still tracked in the code repository, two of them already drifted from the copy the fleet fires — and four live seats are firing the code-repository copies rather than the instructions ones.

# Evidence

Measured 2026-08-04 while carrying #17790, which removed the nine test suites that ran from the code repository against `~/instructions/tools/hooks/`.

#17766 moved the registrations, not the files. `git ls-files 'packages/infra/scripts/*.sh'` on the deployed code repository still lists all thirteen moved guards. Compared byte for byte against `~/instructions/tools/hooks/`, eleven are identical and two have diverged — `block-direct-main-writes.sh` and `clear-terminal-alert.sh`. So a search of the larger repository finds a copy of a live guard that is not the live guard, and the two that drifted are the two anyone would most want to read.

They are not merely dead weight. `ops instructions run-checks` reports `hooks-delivered` failing over a generated spawn payload, `/tmp/agent-settings-ac980ba8ecf2efed.json`, written 2026-08-03 13:02 and still carried by four live seats (pids 149889, 162775, 2988912, 3384417, started 05:19–08:41 on 2026-08-04). Every registration in it names `code/packages/infra/scripts/…`. Those four are running the code-repository copies now, the drifted `block-direct-main-writes.sh` among them, while `settings/agents.json` and `hooks-fire` both describe the instructions ones. A second payload, `/tmp/agent-settings-22b3a61207476e68.json`, carries the same divergence for `block-headless-halt.sh` across two more seats.

`hooks-registered` and `hooks-agree` are green beside this and neither can see it: both read static files, and what diverged is what a running seat was handed at spawn.

Two code-repository surfaces still describe the moved set as living there. `packages/infra/scripts/hooks.json` is the hand-authored inventory `check-hook-wiring.ts` read, and #17766 deleted that check. `packages/infra/checks/src/lib/predicate-derivation-pending.ts` names `block-addon-direct-install.sh` and `block-root-filesystem-scan.sh` by their code-repository paths, so it reads the dead copies.
