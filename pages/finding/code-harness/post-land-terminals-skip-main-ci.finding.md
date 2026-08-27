---
id: 2723a864-9cce-56fe-9c0d-9153795cdeb2
slug: post-land-terminals-skip-main-ci
page-type-slug: finding
title: "Post land terminals skip main CI"
domain-slug: domain/global
---

# Claim

Five terminal failure states of `ops project deploy` are reachable after `landed` —
the point at which the branch content is irreversibly on `origin/main` — and every
one of them aborts before `main_pipeline.requested` is emitted. A deploy that lands
and then trips post-land housekeeping ships content main CI never runs over.

# Evidence

Measured 2026-08-04 off the FSM's own transition table.

`packages/alanwalton/projects/cli/src/pure/deploy-phase-fsm.spec.ts` models the verb
as a linear FSM whose transition set is declared exhaustive. Non-terminal order runs
`polling` -> `landed` -> `reconciled` -> `success`. Four terminals leave `landed`:

  failed_at_deploy_main_ff_failed        failed_at_deploy_main_install_failed
  failed_at_deploy_main_install_drift    failed_at_deploy_addon_install

and one leaves `reconciled`: `failed_at_deploy_prune_local_cache`.

`landed` is entered on guard `deploy_verb.polling_to_landed.fast_forwarded` —
"Coordinator landed the entry on main". Past that the content is on `origin/main`
whatever follows. `project deploy`'s own description fixes the ordering: "post-land
sync + addon install -> emit main_pipeline.requested -> main CI verification". So
all five terminals precede the emit, and the landed SHA gets no main pipeline.

Observed live: deploying #17763, content landed (81 of 81 commits), the verb failed
at `deploy_main_ff_failed`, and the `landed-no-main-pipeline` wedge fired against
`539feba9b1` — uncovered 1210s, routed to fallback with no owner. The wedge detects
the consequence; nothing refuses the shape.

The remedy line names no verb: "`/home/walton/code` is now stale and must be
reconciled manually". The retired corpus already carries the rule that answers this
— a refusal "names the verb and sends the reader to its `--help`, which cannot drift
from what it describes" — and records a measured 30 minutes lost to one that did not.

NOT MEASURED. How many deploys have taken a post-land terminal; whether the wedge
fires on every one; whether the four housekeeping steps are load-bearing before the
emit or could run after it.
