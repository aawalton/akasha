---
page-type-slug: finding
title: "Neither duplicated check pair is redundant"
domain-slug: domain/checks-system
---

# Claim

akasha holds two checks for each of two invariants — links resolving and relations resolving — where `pages/page-type/check.page-type.md:33` states that no domain invariant has more than one check. The pairs are not redundant as they stand. Each member runs in a phase the other does not, and for each invariant no single member sees what the pair sees between them, so removing either half today takes a class of fault out of view rather than removing a duplicate.

# Evidence

Read 2026-08-28.

The four are `checks-system/check/relation-resolves/`, `checks-system/check/links-resolve/`, `tools/audits/relations-resolve.ts` and `tools/audits/links-resolve.ts`. The last two are registered at `tools/run-checks.ts:58-59` and sweep the whole repository when `bun tools/run-checks.ts` runs.

The two under `checks-system/` do not run in the same phase as each other, which is the part that is easy to get wrong. `checks-system/checks.ts:84` reads a phase key as true wherever it is absent, so a check page that names no phase runs in it.

`relation-resolves.check.md:7` states `check-on-patch: true`, so it refuses a change. Its own `:27` states "A relation that named nothing before the change is not reported", so a dangling relation already standing is outside it by design.

`links-resolve.check.md:7-8` state `check-on-patch: false` and `check-on-worktree: false`, and the page names no `check-on-audit`, which the line above reads as true. `checks.ts:93-95` computes "refuses a change" as patch or worktree, and `checks.ts:90-91` records that an audit refuses nothing. So this check gates no write at all; it runs when `ops checks audit` is asked for it, and `ops checks audit --help` states the distinction in its own words: "the gate weighs a change, this weighs the state".

Two measurements today show what each half sees and the other does not.

The repo-wide relations audit reported 30 pages whose `domain-slug` named a page type or domain that had been renamed or deleted — 22 from two page-type renames at `b0f9391fc` and `81ba56f87`, 4 from a domain removed at `83e5ce487`, 3 wrong on arrival, 1 whose subject is gone. Every one predated the change that would be judged, so `relation-resolves` would have reported none of them by its own line 27. Nothing else looks: `pages/finding/finding/dead-domain-folder-passes.finding.md` records that `tools/audits/findings-sorted.ts` holds a finding's key against its folder and neither against the corpus.

In the other direction the rule stood in the checks-system copy and not the audit copy. `links-resolve.check.md:27` states "A page of a type whose body came from elsewhere is not judged" and `links-resolve.check.code.attachment.ts:79-91` decides it by `extends-slug` ancestry on `story-chapter-read`. The audit knew only the mortal waiver, so ten scraped Royal Road chapters failed the suite for links no author here wrote. Repaired at `a1a07591f585a775442d9cde9d1501d2fc0b4105` by importing the rule rather than restating it.

Not measured: what would carry the whole-repository sweep if `tools/audits/` went, and whether the checks-system `links-resolve` standing in the audit phase alone is a decision or a step not yet taken.
