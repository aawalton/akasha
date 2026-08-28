---
id: 5fb133bc-340b-5494-8dbf-588c7ce8fc00
page-type-slug: finding
slug: nine-claude-md-mentions-are-not-pointers
title: "Nine CLAUDE.md mentions are not pointers"
domain-slug: repo/akasha-repo
---

# Claim

Nine `CLAUDE.md` mentions in the tree are not dangling pointers: four are live code handling the file, one is a carrier label, two are test fixtures, and two are quarantined under `dirty/`.

# Evidence

Measured 2026-08-28 at `229e7c5ea9`, alongside the census of sixteen dangling pointers, which excludes all nine.

Live code that handles or writes a `CLAUDE.md` rather than pointing at one: `infra/workspace-cli/src/lib/package-add/run.ts:49`, `infra/workspace-cli/src/lib/package-move/docs-rewrites.ts:16` and `:20`, and `tools/commands/package/add.ts:1`. A carrier label rather than a path: `infra/cluster-checks/src/checks/check-properties-file-key-space.ts:131`. Fixture strings rather than a comment sending a reader anywhere: `infra/workspace-cli/src/lib/package-move/docs-rewrites.unit.test.ts` and `infra/cluster-checks/src/lib/lint-verdict-fold.unit.test.ts`. Under quarantined `dirty/`: `dirty/aura-game-design/game-principles.md` and `dirty/my-faith/OVERVIEW.md`.

The boundary case falls the other way: `temper/game-items-rules-core/src/use-destination-resolver.unit.test.ts:84` is counted among the sixteen despite sitting in a test, because it is a sentence in a test's name directing a reader to a document rather than fixture data.
