---
id: 6e880031-fa4a-536c-8563-c5cd37b5b592
slug: functional-type-vocabulary-forked
page-type-slug: finding
title: "Functional type vocabulary forked"
domain-slug: domain/global
---

# Claim

The `functionalType` vocabulary is declared twice and the two disagree. `packages/infra/workspace/cli/src/lib/package-add/derive.ts` calls it "the nine values a workspace package may declare" and omits `io`; the canonical list in `packages/infra/checks/src/lib/functional-type.ts` has ten and includes it. So `package add --type io` is refused as invalid for a type `check-functional-type` infers and requires, and the `--type` help text teaches nine.

# Evidence

Read against `~/code` at `d01942409a` on 2026-08-07.

`packages/infra/checks/src/lib/functional-type.ts:30–41` exports `FUNCTIONAL_TYPES` with ten entries: `addon`, `next-app`, `service`, `worker`, `cli`, `next-ui`, `local-service`, `access`, `io`, `pure`. `RANK_BY_TYPE` at lines 60–71 gives all ten a rank, `io` at 2. `check-functional-type` asserts every workspace declares a value drawn from this list and that the value matches the inferred one.

`packages/infra/workspace/cli/src/lib/package-add/derive.ts:13–24` exports a second constant of the same name. Its docblock reads "The nine `functionalType` values a workspace package may declare", and it lists `pure`, `access`, `next-ui`, `local-service`, `next-app`, `service`, `worker`, `cli`, `addon`. `io` is absent. Nothing imports one from the other; `derive.ts` imports `@infra/checks/check-package-names` but not the type list beside it.

The consequence is reachable from the command line. `packages/infra/workspace/cli/src/package/add.ts:9` imports that second list and `isFunctionalType`; line 90 rejects an unmatched `--type` with `invalid --type "…". Must be one of: ${FUNCTIONAL_TYPES.join(", ")}`, and line 50 builds the flag's help text from the same nine. So `--type io` is refused, and the refusal names the nine as though they were the vocabulary.

`io` is not a marginal member. It is the complement of `pure`'s source scan — the row that catches a library with OS-level effects, no DB boundary and no deployed artifact — so it is the type a new shared utility most often infers to. Creating one through `package add` cannot declare it, and `check-functional-type` will then require it.

Nothing reports the divergence: the two constants are separate declarations in separate packages, each internally consistent, and no check compares them. `check-functional-type` is a member of `domains/lists/unresolved-checks.md`. Found while ingesting `dirty/knowledge/functional-type.md`, which describes ten types and is queued for removal.
