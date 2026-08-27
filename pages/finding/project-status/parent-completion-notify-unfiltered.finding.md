---
id: de6f051e-c895-5a6e-ae76-7c2db3fdfc79
page-type-slug: finding
title: "Parent completion notify unfiltered"
domain-slug: domain/global
---

# Claim

The T1 project-completion push producer (`packages/alanwalton/apns-push-notifier/src/producers.ts:10,116`) fires on every project row reaching `done` fleet-wide, unfiltered by parent/child, because its select (`id,slug,title,seq`) omits `parentId`, the field needed to distinguish a parent from a child — even though Alan asked (2026-07-29) for notifications only on parent completions.

# Evidence

Project #17292, domain `project-status`, status someday_maybe, live-on deploy. Captured, never defined (no objective was written).

Alan, 2026-07-29: "only notify me for parent project completions" — then, on being shown the grounding, "agreed on the notifications one, that one is straightforward."

Established at capture: the T1 producer (`packages/alanwalton/apns-push-notifier/src/producers.ts:10,116`) fires on ANY project row reaching `done`, fleet-wide, unfiltered. Its select is `["id","slug","title","seq"]`, which carries no parent field, so the producer as written cannot distinguish a parent from a child even if it wanted to. The relation key it would need is `parentId`.

The change has two parts, only the first obvious: add the field to the select, and decide the predicate. "Parent" is not a flag on the row — it is `parentId == null`, which is also true of every row that simply has no tree.

Not yet decided, never went through a definition act:
- Whether the rule is "no children notify" or "no children notify while their parent is open."
- What a childless top-level project does. Under `parentId == null` it notifies, probably right, but that is a decision rather than a consequence.
- Whether child completions should go somewhere quieter rather than nowhere — a tree of nine children landing silently is the failure this could trade into.
- Whether T1 is the only producer with this shape. It is the one that was read; the others were not.

Moved off the row's retired `notes` attribute on 2026-08-15.
