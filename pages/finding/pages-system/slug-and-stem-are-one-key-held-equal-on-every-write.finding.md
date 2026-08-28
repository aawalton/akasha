---
id: 186ad84f-0c5e-5b41-9b67-edf70573ca4a
page-type-slug: finding
title: "Slug and stem are one key held equal on every write"
domain-slug: domain/pages-system
---

# Claim

`domain-slug-declared-twice` and `page-name-unique` enforce one invariant, not two. Each names the same fault in its own words: an address more than one page answers to. The stated slug and the file stem are not two keys. `page-named-as-stated` gates every write on the stem equalling the name, and an unstated slug is read off the stem, so no write can separate them. The pair is structurally redundant, and the stem arm sees a strict superset by construction.

# Evidence

Read and run 2026-08-28. Paths under `pages/page-property-definition/` are shortened.

The prose states one rule. `page-slug...md:18` — "A slug is unique among the pages of its page type." `page-name...md:15` — "the string a page is addressed by" — and `:21` "A page states no name of its own." `domain-slug...md:20` — "A domain's slug sets its file's stem". `page-type-named-for...md:8` defaults the rule to `{slug}`, and `:23` reads a stated name and a stated slug alike as "addressing one page". No line states a separate concern about files being told apart on disk. `page-name...md:27` — "A folder groups pages and names no part of one" — is why one stem must be unique within a type.

Both implementations say the same thing. `page-name-unique.check.code.attachment.ts:35` reports "nothing says which one a reference to it reaches"; `pages/refusal/domain-slug-declared-twice.refusal.md:15` reports that every lookup "reaches none of the rest"; `tools/lib/domain.ts:47` calls a second claim on one slug "a second claim on an address".

The keys are held equal. `page-named-as-stated.check.md:7` states `check-on-patch: true`, and its attachment refuses unless the name equals the stem. `page/name/naming/naming.ts:32-39` reads an unstated slug off the stem.

Neither of the two gates a write. `page-name-unique.check.md:7-8` state both refusing phases false, which `checks-system/checks.ts:93-95` makes audit-only; measured, `checksOnPatch()` returns 11 and it is not among them. `domain-edges` is reached only by `bun tools/run-checks.ts`.

Coverage differs by construction: `slugsIn` (`tools/lib/domain.ts:41`) skips every page stating no slug, and 109 page types state a `named-for`.

The 2 pages where stem and slug differ are faults. `page-named-as-stated` fails both today: `graph/edge-producer/relation/relation.graph-edge-producer.md`, slug `relation-producer`, and `pages/life-theme/temper.life-theme.md`, slug `946`. Both stand on main because that check judges only what a change touches.
