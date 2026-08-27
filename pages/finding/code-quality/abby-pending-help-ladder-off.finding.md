---
id: cd05496c-1f49-5073-b985-e347695c48eb
page-type-slug: finding
title: "Abby pending help ladder off"
domain-slug: domain/code-quality
---

# Claim

`ops abby pending --help` prints a four-tier Faith stoplight ladder of >=100 red, >=1,000 yellow, >=10,000 green, >=100,000 blue. The constant the same file imports and passes to the report builder, `FAITH_LEARN_DAILY_LADDER`, is 2,500 red, 5,000 yellow, 10,000 green, 20,000 blue. Three of the four thresholds disagree, and the surface a caller reads is the wrong one.

# Evidence

Read 2026-08-07 at the working tree of `~/code`, while emptying `dirty/code/packages-alanwalton-abby-cli-claude.md`.

`packages/alanwalton/abby/cli/src/abby/pending.ts:20-30` is the exported `help`, a typed `CommandHelp`. Its `description` ends: "which Faith daily stoplight tier they'd reach today (4-tier ladder: >=100 red, >=1,000 yellow, >=10,000 green, >=100,000 blue) and how far to the next tier". `ops abby pending --help` prints that verbatim, so it is a readout rather than a comment.

Line 51 of the same file declares `const FAITH_LADDER = FAITH_LEARN_DAILY_LADDER`, imported from `@alanwalton/personas-core`, and line 111 passes it as `ladder:` to `buildPendingReport`. The constant, at `packages/alanwalton/personas/core/src/daily-tier.ts:87-92`, is `{ threshold: 2_500, color: "red" }, { threshold: 5_000, color: "yellow" }, { threshold: 10_000, color: "green" }, { threshold: 20_000, color: "blue" }`. I read the constant, not the docblock above it; the docblock at `pending.ts:43-50` also carries the >=100 figures.

Only `>=10,000 green` survives. `>=100 red` is off by 25x, `>=1,000 yellow` by 5x, `>=100,000 blue` by 5x the other way.

A caller reading the help believes 100 points lights red; the report printed beside it is black until 2,500, and the two are read together.

Nothing tests it. `daily-tier.unit.test.ts:84` exercises the constant at its true thresholds; nothing asserts anything about either verb's `help`.

Distinct from `code-quality/daily-tier-quotes-a-divisor-the-row-lacks.md`, which concerns that header's derivation and says "The constant below is not wrong", and from `alanwalton-app/abby-faucet-scans-the-wrong-repo.md`. `rg -l "100 red" findings/` returns nothing.

Two surfaces, not one: `ali/cli/src/ali/pending.ts:20-30` carries the identical string and line 52 aliases the same constant, so `ops ali pending --help` misstates the same ladder. A repair reading only `abby` fixes half of it.

Not established: whether `>=100` was ever right. Not repaired — Read-Only Main forbids writing into `~/code`.
