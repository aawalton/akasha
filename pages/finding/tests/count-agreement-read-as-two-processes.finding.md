---
id: 8d8f3a32-761f-5728-a28c-ef297999872c
page-type-slug: finding
title: "Count agreement read as two processes"
domain-slug: domain/global
---

# Claim

`list.cli.test.ts`'s "--count agrees with returned on an untruncated query" case compares two separate CLI processes reading the same moving status, so it goes red on rows written between the two reads and green when none were — a verdict about the backlog wearing the name of the count path. The same file already carries that argument for its truncated sibling and does not apply it here.

# Evidence

Read on main 2026-08-07.

`packages/alanwalton/projects/cli/src/project/list.cli.test.ts:283` spawns `--status deployment --json`, then `--status deployment --count` as a second process, and asserts `total === parsed.returned` and `total === requireCount(parsed.count)`. Any project entering or leaving `deployment` between the two reads fails it, and a run where none did is a green that says nothing about the count path.

The file already holds the reasoning, at :274-282, written for the truncated case beside it: "A CLI test reaches it only as two reads seconds apart, and `--status done` grows under the fleet all day: such a case goes red on the rows written between its reads and green when none were, which is a verdict about the backlog wearing the name of the count path. The agreement itself stays observed on `--seqs`, whose total is a constant." `--status deployment` is a moving population and `--seqs` is the constant one that sentence points at, so the case at :283 is the shape the comment above it rejects.

It is NOT a duplicate of what #17015 removed. There both surfaces called one shared `fetchServerCount`, so their agreement was a code fact with two call sites. Here they are different computations: `decide-list-count.ts:70` returns `{ count: rowCount, returned: rowCount }` on the untruncated path, counted client-side from the rows just fetched, while `--count` reaches `list-count.ts:117 fetchServerCount`, a server-side COUNT. So an agreement case has genuine content — it just cannot be observed as two reads of a moving set, and a snapshot-free formulation needs both numbers from one invocation, which the CLI emits on no path.

Measured 2026-07-28 by `project-17015`: `--status deployment` held 1 row across six consecutive samples, so it is green nearly always. That project's criterion C4 named only the truncated case, so this was left in place rather than judged. `Trust` on `domains/file-kinds/tests.md` is what it contradicts.
