---
id: 0fc285b4-4f96-501e-9c38-f6dc5eeab17b
page-type-slug: finding
title: "Snapshot gap is a decision"
domain-slug: domain/mathematics
---

# Claim

The `proposition` and `proof` page types are live with no infrastructure-as-code snapshot in the code
repository, and the gap is Alan's decision rather than drift — he directed the snapshots reverted.
Eight sibling domains each carry a page-type seed, so this one reads as the odd hole in a tidy set,
and regenerating it is one command that reads as hygiene. No live document records the decision, and
no mechanism asks whether a type was left unsnapshotted on purpose.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/mathematics/rulings.md`, its only remaining carrier.

The ruling, verbatim from that source at lines 63-67: "**The page-type schema snapshots are
deliberately not committed.** The `proposition` and `proof` types are live in the database; their
local infrastructure-as-code snapshots were reverted at Alan's direction — *'revert those for now,
we'll pull them in later.'* Regenerating and committing them is owed whenever the types are brought
in properly. The gap between the live types and the repo is a standing decision rather than drift,
and closing it unasked reverses him."

Both halves check out against live state rather than against the source.

The types are live. `ops page list --type proposition --properties kind` returns three rows — `Syntax
of L` and `The Proof System of L`, both `kind=definition`, and `Reflexivity of implication: ⊢ A → A`,
`kind=theorem`. `ops page list --type proof` returns one, `⊢ A → A — Attempt 1`, `status` draft.

The snapshots are absent. `git ls-files | rg 'seed.*\.(json|ts)$' | rg -i page` returns a
`page-types/seed*.ts` for meds, chess-puzzles, exercises, food, shows, awen, chess-games and tower.
None for `proposition` or `proof`. Re-run as an absence claim in the form that cannot lie:
`rg -uuu -l -i 'proposition'`, `node_modules`/`.git`/`dist`/`build` excluded — the only hits are
`packages/shared/verdict/src/verdict.ts` (the ordinary logical sense), a coverage config, a generated
Temper quest file, and four word-list files in a Python venv.

WHY IT IS LOAD-BEARING. `domains/mathematics.md` holds a Definition and nothing else, and
`ops page-type` never asks it. The nearest live rule points the wrong way:
`domains/role.md` Adjacent Repair says "Land the repair you find."

Kept in parallel at `dirty/maybe-keep/skills/mathematics/rulings.md`, with a Design entry composed
for `domains/mathematics.md`. Filed because that copy is itself queued for removal.

NOT established: whether the types have since been brought in properly, which would end the decision.
