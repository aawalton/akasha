---
id: 08adb773-f046-528a-a60e-40b549de825c
page-type-slug: finding
title: "Boot test asserts deleted requirement"
domain-slug: domain/code-quality
---

# Claim

`supervisor-boot-assertion.cli.test.ts:89` asserts a boot requirement the same commit that wrote its sibling deleted. It fails on clean `origin/main`, belongs to no tree, and gates nothing — so it has stood red on main and costs a diagnosis to every seat that runs the supervisor package's tests.

# Evidence

Diagnosed by `worker-17492` after a rebase onto main, verified by the manager of #17440 in an ephemeral checkout of `origin/main`, and the two decisive facts re-checked here against the deployed tree.

`REQUIRED_BOOT_FILES` in `packages/agents/supervisor/src/supervisor-config.ts` holds exactly one entry on main: the system prompt. The `~/.claude/CLAUDE.md` entry is gone.

Commit `0675d6ac33` removed it — "the memory file stops being a boot requirement, because the global domain it carried is reached by the domain DAG rather than by a symlink". Its diffstat is seven files. It rewrote `supervisor-config.unit.test.ts` across 71 lines and **never touched `supervisor-boot-assertion.cli.test.ts`**.

Run over a clean `origin/main`: 2 tests, 1 pass, 1 fail. The failing arm is "refuses to start when the Tier-1 memory file dangles", expecting the output to contain the CLAUDE.md path and receiving instead a later fatal on an unroutable database URL.

That received output is the tell, and it is why the failure reads as environmental when it is not. With the refusal deleted, boot proceeds *past* the point the test is about and dies further along. The test is observing a boot that got further than it expects, not one that failed differently, so a reachable database would leave the assertion unsatisfied all the same.

The file is half-updated rather than stale. Its other arm — a dangling system prompt — still passes, that being the entry the commit kept.

It did not gate branch CI on `project-17440`: the slow-suite gate returned PASS over 16 of 16 selected suites. It surfaces only under a scoped run over `packages/agents/supervisor`, which is how it was met at all.

Either direction repairs it — retire the arm as its unit-test sibling already was, or restore the requirement. The commit message says the domain DAG replaced the symlink, which points at retiring it.
