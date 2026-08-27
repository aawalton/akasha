---
id: f435768b-086b-5a3d-b7d0-4bd15f5f98a0
page-type-slug: finding
title: "In process code shapes unchecked"
domain-slug: domain/global
---

# Claim

Nothing checks the shape a verb declares for an in-process code-repository module. `codeModule<T>` is an unchecked cast, so an export or a field renamed over there still compiles here, still passes `code-paths-resolve` — which tests only that the named file exists — and reaches the agent as `undefined` when the verb runs. The one instrument judging such a pairing, `bridge-calls-fit`, covers the bridge route alone: one caller, against 483 in-process call sites.

# Evidence

Measured 2026-08-13 while moving the seven `ops mobile sim` verb bodies out of `packages/alanwalton/mobile-cli`.

The instruments. `tools/checks/bridge-calls-fit.ts` names this problem and scopes itself to the bridge: a reply is "whatever type argument the caller asserted, and nothing holds either to the function on the other side". Tonight it reported `1 probe(s) against 1 bridge caller(s)`. `tools/checks/code-paths-resolve.ts` reported `710 path(s) named into the code repository, 0 standing nowhere`; its body is `if (repo.exists(...)) continue` — existence, never shape.

The uncovered population. `grep -rE "(await|return) codeModule<" tools/ --include=*.ts`, less `lib/code-import.ts` itself, gives 483 call expressions across 162 files, each naming a locally declared interface that nothing holds to the module it resolves.

The checked route is the one verbs are told not to take. `lib/code-import.ts` makes in-process resolution the default and the bridge the exception; `domains/tasks/ops/move-command-bodies.md` repeats that as an invariant. So the uncovered population is the one that grows with every namespace moved.

An instance from this move. `tools/lib/sim-driving.ts` declares `SimSessionState` with six fields, mirroring the zod schema in `packages/alanwalton/mobile-cli/src/lib/sim-session.ts`, which stays over there. Rename one field and `gates/typecheck.ts` passes, `code-paths-resolve` passes, and `ops mobile sim status` prints `undefined` on that row. I probed the twenty members I declared and all resolve today; nothing in the repository repeats that probe.

`pages/finding/instructions-harness/hook-registration-unverified-both-sides.finding.md` records the same shape — a cross-repository pairing no instrument judges — for hook scripts.

Unmeasured: whether a probe per caller is affordable at 483, and whether the same asymmetry stands inside the code repository.
