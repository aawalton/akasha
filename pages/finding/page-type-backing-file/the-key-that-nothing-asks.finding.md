---
id: 368cad24-d7a2-5cb0-9f3f-57df5d351185
slug: the-key-that-nothing-asks
page-type-slug: finding
title: "The key that nothing asks"
domain-slug: domain/global
---

# Claim

`file-backed-pages` is declared on the `repo` schema, means "whether the files in this repo are pages the engine serves", and has no reader. Its four references in the tree are all inside `tools/document/schemas/repo.ts`, and no repo document carries it.

Meanwhile `tools/run-checks.ts` answers that same question 33 times by hardcoding a repo list per check, which is why no check reaches books or stories.

# Evidence

`grep` over `tools/`, `domains/`, `page-types/` and `properties/` finds `file-backed-pages`, `FILE_BACKED_PAGES_KEY` and `fileBackedPagesKey` only at `tools/document/schemas/repo.ts` lines 19, 28, 30 and 39 — the declaration and its one use. None of the six documents under `domains/repos/` carries the key.

`domains/page-type-backing-file.md` states as Design that a repo declares whether it holds file-backed pages. The schema comment adds that absent means false and says so, "a repo nobody has moved holds ordinary files". By that reading `domains/repos/instructions-repo.md` and `memory-repo.md` currently assert something untrue: 1,610 claimed pages stand in one and 2,386 in the other.

I have not added the key to either, because what it means is genuinely open. Every file in the repo, or the repo holds some? The instructions repo holds 4,027 claimed pages and a great many files that are not pages, so under a strict reading it would say false forever, and under a loose one it says true the moment one page lands. The Design line does not settle which, and a wrong guess writes a false claim into a governing document that nothing would catch, because nothing reads the key.

The connection worth seeing is that `tools/run-checks.ts` needs exactly this answer and does not ask for it. Each of its 33 entries carries its own `repos:` list; `pages-hold-shape`, `documents-conform` and `schemas-bind` all say `["instructions", "memory"]`. Adding a repo to the engine therefore means editing a shared file in 33 places rather than setting one key on that repo's own document — and the omission is invisible, since a check that visits no repo reports nothing rather than reporting that it visited nothing.
