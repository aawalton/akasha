---
id: 0cb4f16b-94ed-5efa-b656-308985d6e89e
slug: check-entrypoint-nothing-dispatches
page-type-slug: finding
title: "Check entrypoint nothing dispatches"
domain-slug: domain/global
---

# Claim

One check entrypoint in the estate gates nothing. `check-addon-global-name-dependents` carries no registered step and appears in no scanner registry, so it never runs — and it calls `listAllAddons()` without the empty-roster guard its eleven siblings took in #18166, so it would pass vacuously if it did. It is the sole orphan among 111 `check-*` entrypoints, which is what makes it invisible: nothing in the tree distinguishes an entrypoint that gates from one that does not.

# Evidence

Measured 2026-08-08 against `~/code` at `23decc909`.

**The registry.** `ops enforcement list --json` returns 177 check-steps. Intersecting those names with every `check-*.ts` under `packages/**` that carries `import.meta.main` (111 entrypoints, excluding `dist/`, `.test.ts` and `.d.ts`) leaves 29 unregistered. Twenty-eight of the 29 are syntax-bundle scanners, each named in `packages/infra/checks/src/lib/scanner-registry.ts` and dispatched under an aggregate step rather than one of their own. Searching every non-`dist` file in `packages/` for each of the 29 names, the twenty-ninth — `packages/temper/shared/build-deploy/checks/src/check-addon-global-name-dependents.ts` — is named in exactly two places: `packages/temper/shared/build-deploy/checks/tsconfig.tsbuildinfo`, a build cache, and its own pure core `addon-global-name-dependents.ts`. Nothing dispatches it.

**The vacuity.** Fourteen `check-*` entrypoints called `listAllAddons()` before #18166. On a tree with all 49 `addon.json` removed, twelve now exit 2 naming the empty roster and `addon-locale-string-called` was deleted. This one exits 0, printing `[addon-global-name-dependents] no colliding global with statically-visible dependents found.` over a roster of zero. It was left unguarded because guarding an entrypoint nothing runs buys nothing; that reasoning is right and is also the evidence that it should go.

**Why this is not caught.** An orphan entrypoint is upstream of every instrument the estate points at checks. `check-carrier-coverage`, `check-guard-reach` and the liveness gates all take the registered step set as their population, so a file outside it is outside their claim. The one thing that would surface it — asking of each `check-*` entrypoint which step dispatches it — is asked nowhere.

Escalated by the build seat on #18166 and verified independently here; the project is accepted and closed, and this is the residue it named.
