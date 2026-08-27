---
id: 209f7715-dc5c-51b0-8a47-1edebe8d5ff9
slug: dispatched-by-the-surface-it-cannot-test
page-type-slug: finding
title: "Dispatched by the surface it cannot test"
domain-slug: domain/global
---

# Claim

A check dispatched by one surface and tested only on another is green about the arm nobody
runs it for, and the green is indistinguishable from coverage.

# Evidence

Measured 2026-08-04 on main at dd9b750bbab4876b73c360d9b16169dc14b83035, by the seat
delivering row #17847 and re-read here.

`check-repo-paths` reads path literals across three input surfaces: TypeScript, shell/lua,
and markdown. Its registration in `packages/infra/checks/src/lib/check-configs.ts:371-378`
states "The markdown is the primary target — the substrate scan over ts/sh/lua/package files
is an implementation detail", and gives it `watchNodeTypes: ["md-file"]`. So the check is
dispatched by markdown change and by nothing else.

No fixture under `packages/infra/checks/__fixtures__/repo-paths` contains a `.md` file.
Zero, across all three surviving fixtures. The `clean` fixture's `tracked.txt` lists a
`docs/guide.md` that was never created. Every fixture's only shell file is one identical
`${HOME}`-interpolated line the resolver discards.

Blinding BOTH the shell arm and the markdown arm inside `check-repo-paths.ts` leaves all
three surviving tests green. So `clean` passes against those two arms for want of an input
rather than by their judgment, and the suite's green is a claim about the TypeScript arm
alone — which `bad-ts` and `bad-template-span` do exercise.

Probed separately against a scratch fixture, both blinded arms DO flag a real dangling
input: a dead `[text](href)` link in a `.md`, and a dangling quoted literal in a `.sh`. The
detectors work. Nothing points them at anything.

The suite now runs 3 pass / 0 fail and can fail: a seeded dangling literal in `clean` turns
it red.

NOT MEASURED. Whether the markdown arm has ever fired in production on a real violation.
How many other checks in the estate declare a `watchNodeTypes` naming a surface no fixture
of theirs contains. Whether the removed prose arm was the only markdown coverage the suite
ever had.
