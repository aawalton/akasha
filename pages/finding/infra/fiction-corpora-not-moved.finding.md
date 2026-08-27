---
id: d2699eb8-8663-5d05-998f-3827feca9a33
page-type-slug: finding
title: "Fiction corpora not moved"
domain-slug: domain/global
---

# Claim

In the books/stories repo migration, the transport switch and widened test suite landed via #17880 on 2026-08-05 and are verified, but the three fiction corpora (cornerstone, the-beholder, tower-of-nimue) still live under `~/books` instead of `~/stories`, so fiction is governed by `folders/stories-repo.md` while sitting outside it; what remains is a content move alone, no longer entangled with any change to this repository.

# Evidence

Project #17808, domain `infra`.

Objectives:
1. [x] `alan/stories.git` served by transport, `~/stories` pushes to it — `git -C ~/stories remote -v` names it; a push of current tip succeeds, readable by fresh `git clone`.
2. [x] Transport suite green, repo list widened — `bun test packages/infra/git/transport/` passes, `synth.unit.test.ts` now enumerates five repos not four.
3. [ ] `~/stories` holds the three fiction corpora at the counts that left `~/books` — `find ~/stories/<corpus> -name '*.md' | wc -l`: 18 cornerstone, 14 the-beholder, 14 tower-of-nimue.
4. [ ] `~/books` holds only five non-fiction corpora — `ls ~/books`: all-about-alan, book-of-everything, my-faith, my-math, plato-apology-crito.
5. [ ] Fiction carries history, not one fresh commit — `git -C ~/stories log --oneline -- <corpus>` reaches commits predating the move, each of three.

Notes: DO NOT DISPATCH until CI cutover finishes; Alan set that fence 2026-08-04, not lifted. Objectives 1-2 landed 2026-08-05 via #17880 (widened repo list to five for its own reasons, carrying this row's transport half); verified: `~/stories` names transport `origin` and pushes, transport suite 51 pass/0 fail, `synth.unit.test.ts` enumerates `stories.git`. Row was undivided; two of three done elsewhere, remaining work is a content move alone, not gated on this repository.
Unmoved: `~/books` still holds cornerstone, the-beholder, tower-of-nimue beside the five non-fiction corpora; `~/stories` holds only `coffee-shop-date` (392 files) and `templates` (21) at commit `a7ea3df`. Fiction is governed by `folders/stories-repo.md` while under `~/books` — the gap this row closes, why not superseded. Grounded 2026-08-04; line numbers since moved — read the file.

Not this row's: 41 rows with `package: stories/authored` in `pages/finding/infra/docs-export-deletes-moved-prose.finding.md`; its imminent-deletion claim, checked in #17807, does not hold — the sweep reconciles only page types on disk, none under `~/code/packages/`.
