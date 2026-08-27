---
id: 6d825855-530f-516f-9b2c-e468e746ad38
page-type-slug: finding
title: "This namespace is silent where its siblings speak, on a network reach and on ensuring a page type"
domain-slug: domain/ops-chess-puzzle
---

# Claim

`domains/ops-chess-puzzle.md` is silent where its sibling namespaces speak, on two things true of its own commands. `ops chess-puzzle sync` reaches Lichess over the network by default, and `domains/ops-chess.md` states of its own commands that none reaches a network. `sync` ensures the page type before it writes, and `domains/ops-chess-game.md` carries that as Design for its `ingest`. A reader arriving from `chess.md` meets two namespaces stating these facts and one stating neither.

# Evidence

Found during the review-instructions reading of `domains/ops-chess-puzzle.md` on 2026-08-19, by running `sync` with no `--file` (it streamed the Lichess database) and reading its `--json` output, then comparing the three namespace documents.

Measured: those two behaviours of `sync`, and what each sibling document states. Not measured: whether either fact earns a line here — adding one grows what every reader of the namespace pays for at boot, which the reviewer would not settle.
