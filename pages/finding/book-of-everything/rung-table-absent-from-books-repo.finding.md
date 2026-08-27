---
id: 170d3fa3-84d8-5aad-8cb8-78c0b5cd70d3
slug: rung-table-absent-from-books-repo
page-type-slug: finding
title: "Rung table absent from books repo"
domain-slug: domain/book-of-everything
---

# Claim

The rung table is not duplicated anywhere in the books repo, so promoting the quarantined definition is the only route left to reading the Book's scores — closing the gap `pages/finding/book-of-everything/rungs-defined-only-under-quarantine.finding.md` named as the one thing it did not measure. The books repo spends four rung names in 21 places, all inside evidence prose about one node, and no file in it holds two rungs far enough apart to be a table.

# Evidence

Measured 2026-08-07 in `~/books`, while ingesting `dirty/code/packages-alanwalton-ali-docs-book-of-everything.md`.

The standing finding says outright what it left open: "whether the rung table is duplicated anywhere in `~/books/` itself, which would close the gap without any instruction change — I searched `domains/` and `dirty/` but did not read the books repo exhaustively." This is that read.

`rg -uuo -i "\bD[0-7] \((Novice|Reader|Student|Scholar|Expert|Master|Doctor|Sage)\)" .` over `~/books` returns 21 occurrences across four rungs and no more: `D3 (Scholar)` 8, `D4 (Expert)` 7, `D5 (Master)` 4, `D2 (Student)` 2. Every one sits in evidence prose about a particular node rather than in a definition.

A table would have to hold the ends of the ladder together, and nothing does. `rg -uuo -i "\bsage\b"` returns one file, `book-of-everything/04-human-life/03-human-behavior-and-experience/07-play-games-and-fun/profile.md`. `rg -uuo -i "\bnovice\b"` returns three, `book-of-everything/06-art/profile.md`, `06-art/02-particular-arts/08-drawing-painting-printmaking-photography/profile.md` and `ROTATION.md`. The two sets are disjoint, so no file in the repo names both ends.

I ran the `-uuu` form throughout, so ignored and hidden files are included; `~/books` carries no build output to inflate it. I re-ran the first search after an earlier form returned `D3 (resting)` — a regex artifact from an unanchored alternation, not a rung — and the counts above are from the anchored form.

The one live decoder that is not prose: `ops ali coverage --help` glosses D=0 as 'Novice' inside a parenthesis about coverage keying, and `packages/books/book-of-everything/src/coverage-fold.ts:17` and `:25` carry the 0-7 range on the score types. Neither names a rung above 0, so the code closes none of this.
