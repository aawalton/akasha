---
id: 51a6f002-1794-5a3d-94d0-f4761d3b5079
page-type-slug: finding
title: "Persona verbs exit two where help says one"
domain-slug: domain/ops-cli
---

# Claim

Three persona verbs refuse bad input with exit 2 where their own help block states exit 1 for that same case.

# Evidence

Found while moving the persona namespace's bodies out of the code repository. The disagreement predates the move and was carried across unchanged, since a repair made during a move cannot be told from the move.

- `ops persona reward-queue-pull` — a malformed `--eso-day` and an out-of-range `--target-level` both raise a data error and exit 2. Its help block lists exit 1 as "input error — bad --eso-day or --target-level".
- `ops persona reward-queue-refill` — an empty batch exits 2. Its help block lists exit 1 for it.
- `ops persona set-value` — both passing neither of `--value`/`--clear` and passing both exit 2. Its help block lists exit 1 for both.

Each was run against the live delegating body before the move and against the moved body after, and both exited 2 with byte-identical stderr, so the behaviour is the code repository's and not something the move introduced. A caller reading the help screen to distinguish its own typo from bad data in the store is told the wrong code.
