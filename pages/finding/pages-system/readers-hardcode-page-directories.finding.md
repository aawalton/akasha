---
page-type-slug: finding
id: 44dd16e1-5a71-5bef-bdc0-ac2c8e375e24
slug: readers-hardcode-page-directories
title: "Readers hardcode the directory a page type's pages stand in, and a move cannot repoint them"
domain-slug: domain/pages-system
---

# Claim

`ops mv` repoints an exact path written as text, but never a directory prefix — `move/move.ts:113` expands a directory move into per-file pairs and emits none for the directory itself, and `repoint/mention.ts:64-88` matches only whole moved paths — and at least 56 of the 292 page types still to move have source naming their directory that way. Moving them leaves each reader looking at an empty directory, silently. The seat boot is among them: `seat-resolve.ts`, `seat-vocabulary.ts` and `corpus.ts` reach `domains/personas`, `domains/roles` and `domains/tasks` by prefix, so moving the persona type would blind every seat to its own persona.

# Evidence

Read 10,416 `.ts`, `.tsx` and `.swift` files across the repositories, matching each page type's fixed glob prefix as a quoted string. 56 types matched; some matches are coincidental words rather than page paths, and I did not separate those. I proved the mechanism rather than inferring it: moving `readout-display` under `pages/` left `tools/lib/ios-widget-swift.ts:81` reading an empty `domains/readout-displays`, and every gate reported pass. I repaired that one site. A worktree at the pre-move commit showed the widget composer's other five failures stand there too, so those are not from this work.
