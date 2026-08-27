---
id: d9f7abb9-16ec-5363-b1e9-403366970981
slug: persona-folder-nothing-keeps-true
page-type-slug: finding
title: "Persona folder nothing keeps true"
domain-slug: page-type/initiative
---

# Claim

An initiative's folder now names the persona answerable for it, and nothing in the file names her — so where the domain changes hands the folder goes silently wrong, and no instrument compares the two the way `findings-sorted` compares a finding's folder against its key.

# Evidence

Measured 2026-08-05, sorting the store at Alan's ask from `initiatives/<slug>.md` into `initiatives/<persona>/<slug>.md`. Seven files landed under five personas: `amy/ambient-hud`, `amy/own-editor`, `dalla/code-check`, `dalla/code-harness`, `sophia/persona`, `ryn/trusted-curation`, `athena/trusted-subagents`.

The only key an initiative carries about its subject is `domain:`, typed `once` and as a slug by `tools/document/schemas/initiative.ts:18`. The persona is two hops past it: `tools/owns.ts` reads `persona-champion-slug:` off the domain, and where the domain declares none it walks `domain-parents:` to the nearest that does. Two of the seven were placed that way — `code-check.md` declares `domain: code-check`, and `ops instructions champions --domain code-check` answers `dalla, named by domains/code-harness.md`, a surface the initiative never mentions.

So three things can each move the right answer without touching the file: a `persona-champion-slug:` rewritten, a `domain-parents:` edge redrawn, or an `championed-domain:` reassigned. The folder is the sole record of the placement and the only thing that would then be wrong.

`checks/findings-sorted.ts` is the instrument for the same shape one store over, and its own docblock states the case: "TWO SURFACES STATE WHO OWNS A FINDING once the store is foldered ... a folder and a key that disagree are each individually well-formed, so nothing else in either tree can tell which one drifted." It refuses rather than counts. Its subject is `findings/` alone; `ops instructions run-checks` reports `[findings-sorted (memory)] pass — 332 finding(s) sorted under 73 domain folder(s)` and nothing at all about `initiatives/`.

The finding store does not have this problem, its folder naming the same thing its key does. The initiative store's folder and key name different things, one derived from the other.

Not measured: how often a domain has changed hands. `rehome-leaves-outgoing-lead.md` records one such move on 2026-08-02, of the `persona` initiative's rows, so the event is not hypothetical.
