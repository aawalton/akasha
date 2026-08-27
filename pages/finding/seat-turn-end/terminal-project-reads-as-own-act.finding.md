---
id: e81585ad-4f18-56f7-a4ad-343c7ec00089
slug: terminal-project-reads-as-own-act
page-type-slug: finding
title: "Terminal project reads as own act"
domain-slug: domain/seat-turn-end
---

# Claim

`ops seat held-wake` answers `own-act-next` for a seat whose project sits at a terminal status, so the halt guard REFUSES the halt of a seat whose work is finished and tells it to hand over a project nobody can act on — and then permits the halt on the retry, which is how the seat ends up resident forever.

# Evidence

Measured 2026-08-09T23:45Z, replaying the guard's own two reads against every running seat from outside.

`ops seat held-wake --agent-id 019fe80e --json`, whose project #18234 is at `done`:

    {"verdict":"own-act-next","basis":"status","allowsStop":false,"statuses":["done"]}

The same verdict came back for every seat on a terminal project — #18238, #18209, #18194, #18163. The verb reads `awaiting_*` as another layer owing an act and everything else as the seat's own act being next, so the four exits fall into the second class. A finished project names nobody's act, and the remedy the guard prints for `own-act-next` asks the seat to `move-to awaiting_<layer>_<act>` on a row that has already left the ladder.

The retry is what makes it terminal for the seat. `block-headless-halt.sh` never blocks the same seat twice in a row, so the second attempt is allowed, the turn ends, and the supervisor keeps the process resident.

It matches the transcripts exactly. Seat `019fe745` on #18203 ran `ops seat stop --help` at 16:46:37Z and emitted a closing report at 16:46:55Z without running the bare verb — the guard's own remedy text names `bun ops seat stop`, and reading it is what the seat did.

Found while cleaning up after changing the guard's `held-wake` arm to take the stop itself (0616d4f1). That change is correct and reaches the wrong population: of 24 running seats, exactly one answered `held-wake`. Ten answered `own-act-next`, five of them on projects at `done`.
