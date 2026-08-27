---
id: b0930781-90ea-59ec-809f-0784e8fed612
page-type-slug: finding
title: "Decider outside the model population"
domain-slug: domain/global
---

# Claim

The formal-model convention in `@alanwalton/projects-cli` reaches 8 of the 67 modules under `src/pure/`, and the decider for an abandoned pipeline's deploy is not among them — it sits in `src/lib/`, outside the directory the pairing convention can enumerate at all, so no model could be paired to it where it stands. The eight that are modelled are model-checked by nothing.

# Evidence

MEASURED AT ~/code HEAD `977e7d5a3e`, 2026-08-10, by `git ls-files`.

`packages/alanwalton/projects/cli/src/pure/` holds 67 modules excluding `*.test.ts` and `*.spec.ts`. Eight carry a `.spec.ts`, and the package's `spec/` holds exactly eight `.fizz` — decide-deploy-success, decide-idempotent-skip, decide-rebuild, deploy-phase-fsm, enqueue-handoff, freshness-coupling, post-land-flock-convergence, wait-for-main-deploy. So the pairing is complete and the coverage is 8 of 67.

THE CONVENTION IS KEYED ON A DIRECTORY. `packages/infra/checks/src/lib/fizz-spec-pairs.ts` computes, for each `packages/<pkg-root>/spec/<name>.fizz`, the canonical source at `packages/<pkg-root>/src/pure/<name>.spec.ts`. `decideResolvedDeploy` lives at `src/lib/deploy-resolved-decision.ts`, so it is not merely unmodelled: it is outside the population, and writing a model for it in place would still pair with nothing.

THE NEIGHBOURING MODEL DOES NOT REACH IT. `spec/wait-for-main-deploy.fizz` and `src/pure/wait-for-main-deploy.spec.ts` each contain zero occurrences of `resolved`. Their Verifier FSM is `polling → {success, failed, terminal_fetch_error, terminal_stall}`, while `ResolvedDeployDecision` at `deploy-resolved-decision.ts:110-132` has kinds `pass`, `fail`, `continue` and `unknown`. The decider carries two unit tests and no model.

IT COMPOUNDS. `SPEC_DIRS` in `check-spec-bundle.ts` omits this package, so all eight of these specs are model-checked by nothing. The completeness of a model nothing runs buys less than it reads as buying.

WHAT THIS CLOSES. `pages/finding/code-check/no-check-requires-a-spec-to-exist.finding.md` lists as not measured "whether any decider currently lacks a spec, how many `src/pure/*.spec.ts` stand unpaired". In this package: none stand unpaired, and 59 modules have no model.

NOT MEASURED. Whether all 67 warrant one — I counted modules, not deciders — and the same ratio in other packages.
