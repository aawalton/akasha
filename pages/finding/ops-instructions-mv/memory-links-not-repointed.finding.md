---
id: b678ec6a-b401-50fa-b97f-5400df02464e
page-type-slug: finding
title: "A markdown link from the memory repo into a moved instructions page is left pointing at the deleted path, and the mentions check calls it clean"
domain-slug: domain/global
---

# Claim

`ops instructions mv` repoints links inside the instructions repository and does not repoint markdown links that reach it from the memory repository. Its `[mentions]` check reports those files as clean in the same run, so the breakage is not merely unrepaired — it is reported as absent.

# Evidence

On 2026-08-22, moving `pages/domain/code-editor-panel-projects.md` to `pages/domain/code-editor-panel-work.md` printed `[mentions] pass — 24127 file(s) checked, 0 mention(s) would be stranded among the live documents` and `[links] pass — 8494 document(s) checked, 0 link(s) would break`, and committed as `62513cb7`.

`pages/project/19450.md` in the memory repository carried two links written in the form the project page type asks for:

`- ["the sentence"](../../../instructions/pages/domain/code-editor-panel-projects.md)`

Both still named the old path after the move, and the file they named had just been deleted by that same commit. Its `domain-slug: code-editor-panel-projects` was left standing too. All three were repaired by hand.

The relative form is what a project document is told to use — `define-project` states it — so this is the ordinary spelling rather than an unusual one, and every live project quoting an intent off a domain carries it.

Not measured: whether the same holds for the books and stories repositories, whether `ops memory mv` has the mirror-image gap moving a memory page that instructions links to, and whether the 24127 files the mentions check counted include the memory repository at all or whether the two numbers describe the instructions repository alone.
