---
id: 9f730d12-bd2a-5305-8919-14f06aa76803
page-type-slug: finding
title: "Five production sites land akasha pages below the gate"
slug: five-production-sites-land-akasha-pages-below-the-gate
domain-slug: domain/page-writes-system
---

# Claim

`akashaGated` is called from `land` alone, at `repo/land/land.ts:318`. `landFiles` at `repo/land/land.ts:163` is a second export that reaches no gate, and five production sites call it directly — `landOne` at `tools/lib/page-write-commit.ts:68` and four worktree commands. A write through any of them commits to akasha without the checks. `page/page-seq.ts:4-6` records the hazard in its own docblock and routes around it.

# Evidence

Measured 2026-08-28 at `7cb7f0ab60`.

The gate stands on one entry point. `akashaGated` is defined at `repo/land/land.ts:274` and called once, at `:318`, inside `export function land(` at `:306`. `landFiles` at `:163` is a separate export and reaches it nowhere.

Production callers of `landFiles`:

- `tools/lib/page-write-commit.ts:68`, inside `landOne` at `:58-79`
- `ops-cli/worktree/merge/merge.command.code.attachment.ts:144`
- `ops-cli/worktree/abandon/abandon.command.code.attachment.ts:149`
- `ops-cli/worktree/check/check.command.code.attachment.ts:126`
- `ops-cli/worktree/start/start.command.code.attachment.ts:206`

Beside those, `repo/land/land.unit.test.ts:66` and two stale `dist` declarations.

The hazard is already written down where somebody worked around it. `page/page-seq.ts:4-6` states that no seq is taken there, that `tools/lib/page-seq.ts` takes them by spawning the edit command so every advance of a `next-seq` counter is judged by the akasha checks, and that an allocator in that package would instead reach `landFiles`, which stands below `akashaGated`, and move the counter past the gate.

`tools/lib/page-seq.ts` does what that says: `spawnSync` at `:101` running `edit.ts` at `:105`, advancing `NEXT_SEQ_KEY` at `:97-98`, one call for the whole run rather than one per seq at `:133`.

`landOne` is not wholly unguarded — `refuseALiveTestWrite` at `page-write-commit.ts:66` stands in front of it — but that guard is about a test write reaching the live store, not about the akasha checks.

19 modules import from `repo/land/land`.

Not measured: how many pages have landed through `landOne` without being checked.
