---
id: c8d527a1-2552-5708-b44c-f6ee0b41ed90
slug: parsed-marks-finding-outlived-its-entry
page-type-slug: finding
title: "Parsed marks finding outlived its entry"
domain-slug: domain/code-comment
---

# Claim

The claim of `pages/finding/code-comment/parsed-comment-marks-unlisted.finding.md` has stopped being true: it opens "The `command` entry on `domains/lists/code-comment-forms.md` names one mark and one reader", and that list carries no `command` entry at all. Two documents cite the finding by path — project #19012 and `pages/finding/code-comment-forms/two-kinds-one-list.finding.md` — so what `page-types/finding.md` says to do with it strands both citations.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/lists/code-comment-forms.md`, which met it and passed it on rather than acting.

I read `domains/lists/code-comment-forms.md` at `f32194d09` myself: its List holds shebang, expect-error, biome suppression, shellcheck directive, ast-unused pragma, triple-slash reference, no-self annotation and deprecation. Neither `command` nor `command header` is among them. I found the two citations by searching the memory repository for the finding's path.

The reading reports two further checks I did not re-run: that Alan removed the `command header` form and its recogniser himself at `070ee0ff8`, the removal `ccbb12763` had announced in advance; and that `tools/glossary.ts`, `tools/dag.ts`, `tools/file-finding.ts` and `tools/compose-subagents.ts` now declare their command in an exported object rather than in a comment, so no form needs to cover it.

It also reports seat `019fecd1-154c-7a14-95d3-fc01e97fcb46` stating that the finding was kept alive because the list names the block-header mark "since I added a `command header` form" — a reason the list itself contradicts.

Not measured: nothing here weighs the finding against `pages/finding/code-comment-forms/two-kinds-one-list.finding.md`, which makes a wider claim resting partly on this one, and nothing here says what #19012 still needs from it.
