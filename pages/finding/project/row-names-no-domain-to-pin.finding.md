---
id: a8461700-c629-5ab8-b247-ed4ba23bc0e3
slug: row-names-no-domain-to-pin
page-type-slug: finding
title: "Row names no domain to pin"
domain-slug: barred-meaning/project
---

# Claim

A project row names no domain, so a seat dispatched onto one is pinned by persona, role and task and never by the concern its work reaches. A domain's vision is put in front of that seat only where the files it happens to edit are globbed by that domain, and nineteen of the twenty-eight domains carrying a `# Vision` declare no path key at all.

# Evidence

Measured 2026-08-05 against `~/instructions`. `ls domains/*.md` returns 80 documents; 28 carry a `# Vision` and 10 declare `instructions-path:`. The nineteen carrying a vision and no path key of any kind are code-editor, code-harness, governance, identity, instructions-check, instructions-gate, link, memory, mention, ownership, persona, principle, project-path, project-track, reference, region, role-mode, rule and task. That is not itself a defect: `tools/document/schemas/domain.ts:109-111` says a path key is "left out where the domain's area is not a set of files", and several of those nineteen are concepts rather than places.

What has no route is the other direction. `bun tools/lib/governs.ts --file-path personas/ryn.md` returns `domains/persona.md` because `personas/ryn.md` itself declares `domain-parents: persona`, so both delivery routes — a glob reaching the path, and the document naming its own domain — are properties of the FILE being written rather than of the concern being changed.

`#17327` changed how a persona seat is named, which is the subject of `domains/persona.md`'s vision — "a name carrying a default role and a default domain, so that naming her names all three" — while editing files in the then-live skills tree. Nothing put that vision in front of the seat, and the row stood `done` for five days until Alan caught it on 2026-08-03.

The mechanism to close it already exists on the other side: `ops seat start --domain <d>` pins a seat to a domain and its ancestors, and `ops instructions compose-boot` renders exactly that closure. What is missing is the row saying which domains its work reaches, so `dispatch-project` has nothing to pass.

Not measured: how many rows since `#17327` touched a domain whose vision they never loaded, and whether `tasks/lead/define-project.md` has anywhere a domain list would sit.
