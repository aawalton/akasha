---
id: a1755dc1-2b30-5ada-9506-7474783afc9d
slug: foreign-root-concept-parked
page-type-slug: finding
title: "Foreign root concept parked"
domain-slug: domain/global
---

# Claim

`check-repo-paths` has no concept of a foreign root, so any string literal naming a file in `~/instructions` reads as a broken path (the instructions repo has no remote and cannot be cloned into a CI pod); a narrow fix landed inside #16450, but the general foreign-root concept is parked under Rule of Three, owned by `dalla`, until a second foreign root appears.

# Evidence

Project #16508 (domain code-harness, status someday_maybe). Split out of #16450 on 2026-07-26, not ridden on that migration's deploy.

Gap: `check-repo-paths` resolves every string literal against the code root. A literal naming a file in `~/instructions` reads as broken though true — the instructions repo has no remote, so no CI pod can clone it. Declaring the root cannot fix this; only a foreign-root concept can.

Feasibility, measured by worker-16498b: `declaredInstructionSurfaces` extracts cleanly (4 lines, pure, takes script TEXT not a path, no test-only deps), lands in `instruction-reload-core` without crossing its `pure` boundary; `@infra/checks` (cli rank 4) importing `pure` (rank 1) is allowed. ~4 lines in child package vs ~60-100 in `packages/infra/checks`.

Own row not folded into #16450: a new concept (foreign roots) in a repo-wide CI gate is new-pattern territory - Alan's gate. #16450 refused to decide under schedule pressure.

Trap for any future build: a naive check comparing a literal against the constant under test (e.g. `SYSTEM_PROMPT_PATH` vs itself) is vacuous, always true. The non-vacuous shape validates against `declaredInstructionSurfaces(setup-symlinks.sh)`, the declaration. Needs a negative test (a wrong constant the check must reject). Same shape as #16470's first criterion.

Superseded 2026-07-26: narrow fix landed inside #16450 instead - ~15-20 lines in one existing file, `repo-path-resolver.ts`, unchanged, nothing exported, `@infra/checks/package.json:4` already declares `@agents/shared`. Confined: `classify.ts` is the only non-test holder of such literals by construction; `skills/` literals can't trip the check (not in `REPO_TOP_LEVEL_PREFIXES`); only `docs/`-prefixed literals qualify, in one file.

Now the generalisation, not the fix. Rule of Three: parked, owner `dalla` (repo-wide CI gate is his domain), live once a second foreign root appears.

Row captured but never defined; moved off the retired `notes` attribute on 2026-08-15.
