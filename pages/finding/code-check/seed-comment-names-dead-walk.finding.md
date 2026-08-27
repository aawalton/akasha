---
id: 4a5f1d95-f933-5e95-aa1c-0ca6c265406c
slug: seed-comment-names-dead-walk
page-type-slug: finding
title: "Seed comment names dead walk"
domain-slug: domain/global
---

# Claim

The `healthkit-read-only` registry comment names a function the check does not call. `check-configs.ts:90` explains that entry's `sh-file` population seed by saying the check reads the population "through the producer's own `walkShFiles`". The check reads it through `discoverRepoFiles` narrowed by `classifyExtension`, and its own header calls `walkShFiles` "the wrong one". A reader retiring the dead walk is told by the registry that the seed depends on it.

# Evidence

Read on 2026-08-10 in `/home/walton/worktrees/18484` at `2967e0b66e`, verifying project #18507.

- `packages/infra/checks/src/lib/check-configs.ts:90-94` carries the comment, above the entry's `watchNodeTypes: ["sh-file"]`.
- `packages/infra/checks/src/checks/check-healthkit-read-only.ts:56` is the actual read: `discoverRepoFiles(repoRoot).filter((rel) => classifyExtension(rel) === "sh")`. Lines 19-23 of the same file say `walkShFiles` "reads as the obvious call and is the wrong one".
- `packages/shared/graph/producers/src/file/file.node.producer.ts:155-156` is where the graph's `sh-file` nodes come from, and it is that same pair.
- `grep -rn "walkShFiles" --include=*.ts packages/` returns its definition at `packages/shared/graph/producers/src/file/sh-file/discover.ts:21` and calls only from `discover.cli.test.ts`.

The claim the comment is making — that what wakes the check and what it judges are one derivation — is true. Only the route it names for that is wrong, which is what makes the line read as current. `b6d15a61ac` gave the entry its population seed and this comment; `e3aae6b9a2` then moved the check off `walkShFiles` without moving the comment with it.
