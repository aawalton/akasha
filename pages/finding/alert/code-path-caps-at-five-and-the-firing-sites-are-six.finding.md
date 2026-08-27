---
id: 040fdbec-86bb-59bd-ac40-c23b2aba36a9
page-type-slug: finding
title: "Code path caps at five and the firing sites are six"
domain-slug: page-type/alert
---

# Claim

`alert`'s area cannot be spelled as its `code-path:`. The property caps the list at five globs, and six are needed to name every firing site standing today — the two agent packages, the notifications transport, the supervisor's push, the memory-reaper's kill sender, and the slow-suite sweep. Any check resolving its population from `code-path:` therefore passes firing sites it was written to refuse, and that pass is indistinguishable from a clean estate.

# Evidence

Adding the two missed sites to `page-types/alert.md` was refused by `page-holds-properties`:

    `code-path` holds a list of 7 where `region | list(region, max 5)` states a glob of the repo its own key names

Five entries stand today. `packages/agents/main-pipeline-alert/**` leaves when #19177 deploys, which frees one slot and leaves the honest list at six.

The two sites outside the declared area, both live on `project-18963` at `0378c35903`:

- `packages/infra/ci/slow-suite-sweep/src/run-sweep-and-notify.ts` fires `slow-suite-red`, imports `@agents/shared/db` and `@agents/shared/message-warrant`, and resolves `dalla`. Its own sibling `build-notification.ts` says the shell "runs the sweep, resolves dalla, and emits".
- `packages/agents/shared/agent-kill-alert-send.ts` fires `host-survival-kill`, and imports `resolveAgentTarget` and `sendMessage` from `./db`, `ANNOUNCE` from `./message-warrant`, and `resolveDomainLeadOrDefault` from `./recipient-derivation`.

Both conditions have documents under `domains/alerts/`, so both are alerts by the domain's own reckoning.

How they surface: 75 documents against the 73 `- alert:` lines in `prometheus-configmap.generated.yaml` leaves seven backed by no Prometheus rule. Five of the seven are devops-monitor wedge classes, inside the declared area. These two are not, and #19177's account calls all seven wedge classes.

`tools/checks/alert-names-no-recipient.ts` resolves its population from `code-path:` — 99 files on `main`, 78 on the branch — so neither site is ever in the set it reads.
