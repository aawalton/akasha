---
id: 2b2910a6-f020-52d9-accd-488231337def
slug: rbac-kubectl-scripts-unregistered
page-type-slug: finding
title: "Rbac kubectl scripts unregistered"
domain-slug: page-type/pipeline
---

# Claim

In the pipeline domain, `packages/infra/ci/workflows/src/rbac-check-pipelines-kubectl.ts`'s `SHELL_SCRIPT_PATTERNS` map is empty, so `rbac-check-pipelines.ts` cannot expand the kubectl verbs run by `packages/infra/scripts/ci-apply-manifests.sh` and `packages/infra/lib/deploy-functions.sh`, leaving their kubectl commands invisible to the RBAC coverage check even though both scripts are live and run kubectl.

# Evidence

From project #16428 (domain `pipeline`, status `someday_maybe`). Surfaced by worker-16406 during #16406, which emptied the map by deleting its only entry (`ci-deploy-nextjs.sh`, a script with no caller). Never carried an objective — this is its capture.

Mechanism: `packages/infra/ci/workflows/src/rbac-check-pipelines-kubectl.ts` exports `SHELL_SCRIPT_PATTERNS`, a map from script basename to a function returning the kubectl commands that script would run. Its sole consumer, `rbac-check-pipelines.ts:99-113`, checks `cmd.includes(scriptName)` per step command and, on a match, parses the synthetic commands into the demand side of the coverage check. It grants nothing — supply is read separately from per-package `rbac.ts` profiles and `clusterRoleRules` — so an entry only tightens the check. Confirmed by reading the code, not the name.

Why it matters: the map is empty but has real unregistered subjects. Workflow steps invoke shell scripts that run kubectl, invisible to the check with no entry to expand them. Observed call sites: `packages/infra/scripts/ci-apply-manifests.sh` (invoked from `kubectl-apply.ts:111`); `packages/infra/lib/deploy-functions.sh` (invoked from cloudflared `foundation.workflow.ts:160,188`, runs kubectl apply among others).

Deliberately not done in #16406: removed only the dead entry, left the machinery — inventing entries means modelling each script's kubectl verbs, real work with real risk (an inaccurate model either reds the gate or masks a gap), not bundled into a cleanup row.

Suggested shape: an entry per live kubectl-running script, derived by reading it; consider making the pairing structural — an entry-less script whose command text reaches a pipeline step is statically detectable.

Caution from the parent row: the removed entry was stale for ten weeks, claiming the script ran `kubectl set image`, which its own comment says it stopped doing in #8707. A hand-maintained model of another file's behavior drifts silently.
