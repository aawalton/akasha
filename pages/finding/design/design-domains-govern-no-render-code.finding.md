---
id: 469fc7a2-fa98-52d6-b7aa-f0badeb3ecd8
page-type-slug: finding
title: "Design domains govern no render code"
domain-slug: domain/design
---

# Claim

The design domains govern no file that draws anything.

`design` and its four children — `contrast`, `repetition`, `alignment`, `proximity` — sit above nothing that renders. The code laying out the interfaces they describe is governed through `code-repo`, which does not pass through `design`, so an agent editing a widget or a component reads none of them. The tile whose layout raised the one rule on `proximity` is governed by four documents, and no design document is among them.

# Evidence

`ops instructions governs --file-path /var/home/walton/code/packages/alanwalton/native-shell/ios-widget/ClaudeUsageView.swift` names `domains/code.md`, `domains/folders/alanwalton-app.md`, `domains/folders/code-repo.md` and `domains/global.md`. That file draws the Claude usage tile, whose medium layout is the case `Tighter Inside` on `domains/proximity.md` was written against.

`ops instructions governs --file-path domains/folders/design-system.md` names `code-repo` and `code` among its parents and no design document. `domains/folders/design-system.md` carries `domain-parents: code-repo` and `code-path: packages/shared/design/**`.

`domains/proximity.md`, `domains/contrast.md`, `domains/repetition.md` and `domains/alignment.md` each carry `domain-parents: design`. `domains/design.md` carries `domain-parents: global` and no `code-path` or `instructions-path`.

Not measured: whether any other route puts a design document in front of an agent editing rendering code — a seat's own reading list, a boot digest, or a task document was not checked. Only the `governs` command and the `domain-parents` and path keys on the documents themselves were read. Whether the right repair is a parent edge, a path glob, or leaving the design domains as reference was not considered.
