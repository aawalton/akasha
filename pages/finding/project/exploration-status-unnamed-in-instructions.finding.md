---
id: 01e2968f-cfad-5a93-818d-e39e38125e36
page-type-slug: finding
title: "Exploration status unnamed in instructions"
domain-slug: barred-meaning/project
---

# Claim

`exploration` is a live project status that no live instruction document names. It stands in `PROJECT_STATUS_VALUES` and a code docblock calls it half of "the domain lead's define-front", but `rg -uuu -c "exploration"` over `~/instructions/domains/` returns nothing at all. A lead moving a row through that stage has no statement in this estate of what the stage is or when it is done.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/narrative-abstraction/rulings.md`, whose shelf entry rules that no row "may be absorbed, closed into another project, or dispatched" until it has been through exploration — a ruling gating on a stage the live corpus does not describe.

In code. `packages/alanwalton/projects/core/src/types.ts:81` lists `"exploration"` in `PROJECT_STATUS_VALUES`, second of nineteen. The docblock above it, lines 51-55, is the only description anywhere: "`awaiting_lead_definition` / `exploration` — the domain lead's **define-front**. It opens at the lead's acceptance because a project row exists in the first place because a lead decided to define something, and `exploration` follows because a row whose scope is being worked out has more fixed about it than one nobody has taken up yet, and less than one whose contract is written." That says where the status sits on a settledness ordering. It does not say what a seat does there or what ends it.

In the instructions. `rg -uuu -c "exploration"` over `~/instructions/domains/` returns nothing — zero occurrences, case-insensitive, across every domain, task and role document. The same search for `someday_maybe` returns exactly one line, `domains/tasks/lead/define-project.md:38`. So the adjacent status is named once and this one never.

Why nothing reports it. `domains/code-quality.md` **Code Comments** forbids writing an instruction as a code comment, on the ground that a comment is capped by nothing and displaces nothing. The docblock above is the closest thing to a definition of this stage that exists, and it sits exactly where that rule says an instruction may not live — so the gap and its only filler are the same text.

What this does not settle: whether the stage wants a task document, a line on `domains/project.md`, or nothing at all because `domains/tasks/lead/define-project.md` already covers the work under another name. `define-project` does not use the word.

`-uuu` throughout; bare `rg` reaches only tracked, non-hidden files.
