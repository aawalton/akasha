---
id: 0a014795-c875-5411-a3ff-3863741a5f45
page-type-slug: finding
title: "Resume policy differs by door"
domain-slug: barred-meaning/agent-launch
---

# Claim

One seat gets two resume-policy answers depending on which door it is reached through: `ops seat acquire` calls a bespoke resolver that knows one name, so every other seat resolves `fresh`, while the router consults the assembled specs and honours what the seat declared. The bespoke resolver's own comment sets a trigger for extracting a registry, that trigger has been met, and a wrapper was added instead.

# Evidence

Read 2026-08-07 against `~/code` at `ecf5f9518f`, while ingesting a quarantined findings cluster that recorded a two-seat version of this.

`resolveResumePolicy` (`packages/agents/routing-core/src/ki-handler-spec.ts:72-74`) is `name === KI_HANDLER_SPEC.name ? KI_HANDLER_SPEC.resumePolicy : { kind: "fresh" }`. One name matches; every other resolves `fresh`.

`packages/agents/cli/src/agent/acquire.ts:141` passes `resumePolicy: resolveResumePolicy(name)` — the bespoke resolver, with no spec set. `route-and-delegate.ts:84-85` instead takes `resolveResumePolicyFromSpecs(decision.target, opts.specs)` when specs are present, and `route.ts:127` supplies them from `liveAdminFabric()`. So the two entry points answer from different bodies.

The population is wider than one seat. `sms-entry-points.ts:47,65` declares `jenny-handler` with `resumePolicy: { kind: "resume-under-budget", tokenThreshold: 150_000 }`. `standing-persona-spec.ts:65` gives every standing persona `resume-under-budget` per a shared constant. Each of those resolves its declared policy through the router and `fresh` through `acquire`. `amy-handler` is on the live roster today.

The sharp part is that the code names its own trigger and passed it. The comment at `:68-71` reads: "Bespoke (n=1): ki-handler opts into resume-under-budget; every other name keeps the fresh default … When jen-handler arrives (n=2), extract a registry (Rule of Three) — NOT before." Twelve lines below, `:82-84` records that n=2 arrived: "jenny-handler declares `resume-under-budget` too, and the bespoke resolver alone would answer `fresh` for her." The registry was not extracted; a wrapper was added over the n=1 resolver, and the n=1 comment still stands unamended, so a reader meets a deliberate deferral whose stated condition is already met on the same page.

Not measured: whether any seat has actually been acquired on the wrong policy. The chosen policy is not recorded on the row, so that is not recoverable after the fact.
