---
id: ffe9562e-d42f-5b4d-9409-0db82e4085e4
slug: tree-group-restated-by-hand
page-type-slug: finding
title: "Tree group restated by hand"
domain-slug: domain/code-quality
---

# Claim

The docs validator builds its own `[trees: …]` line instead of reading `ESTATE_TREES`, so the estate has two answers to which trees it holds. The second answer has been wrong since the books repo was declared, and it renders beside a coverage claim as if it were the same measurement.

# Evidence

Met 2026-08-03 while adding a fourth member to `ESTATE_TREES` under #17596, by searching the repo for anything pinning the rendered tree group.

`packages/infra/scripts/src/docs-validator/validate-cli.ts:115` reads:

`const coverage = ` then a template literal spelling `[trees: code-repo …, instructions …]` from two locally computed reach values. It imports nothing from `@infra/checks`' tree registry and names two trees by hand.

`ESTATE_TREES` in `packages/infra/checks/src/lib/estate-trees.ts` names four as of this row and named three before it: `code-repo`, `instructions`, `books`, and now `memory`. The books member landed at `c4588e4fa2` on 2026-08-03, so the divergence is not new with the memory tree — it opened the moment a third tree was declared and nothing reported it.

The registry's own module comment states why it is the single site: "THE SET LIVES HERE BECAUSE THIS IS THE ONE POINT EVERY REPORTING CHECK ALREADY PASSES THROUGH … A tree added here is therefore reported by every check at once, with nothing to remember per check — which is the whole difference between this and the three hand-written carrier reports it replaces." The validator is a fourth hand-written report of the same kind.

Adding a member costs two compiler refusals inside `@infra/checks` — `estateTreeRoots` and `CARRIERS_BY_TREE` are both `Record`s over the union — and zero anywhere else. This line is outside that reach, so it does not fail to build and does not fail a test; it simply keeps rendering a shorter list.

What a reader gets is two lines of the same shape, from two instruments, disagreeing about how many trees exist, with nothing on either saying which is the register.
