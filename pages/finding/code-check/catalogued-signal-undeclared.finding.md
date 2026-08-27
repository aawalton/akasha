---
id: 5541824e-5864-5224-b41f-f7fe7b27fd44
slug: catalogued-signal-undeclared
page-type-slug: finding
title: "Catalogued signal undeclared"
domain-slug: domain/global
---

# Claim

The liveness census catalogues a signal on an identifier that no file in the code
repository declares, so every instrument built on the census carries a catalogue
entry that cannot match anything.

# Evidence

`packages/infra/checks/src/lib/liveness-signals-verdict.ts:144` catalogues the signal
`decide-stale-claim-releases` on the identifier `decideStaleClaimReleases`, with role
`carries-verdict`, sampled entity `agent-seat` and the subject "the decision to
release a project claim because its holder is judged gone".

Searched every file under `~/code` outside `node_modules` and `dist`, in every
language rather than only TypeScript. The string `decideStaleClaimReleases` occurs
exactly twice: that catalogue entry, and a JSDoc line at
`packages/infra/checks/src/lib/liveness-routing.ts:101` naming it as one of three
parallel deciders. No file declares it, exports it or calls it. Its two named
siblings in that same JSDoc are both real — `buildIsDead` at
`packages/agents/shared/dead-agent-oracle.ts:183` and `classifyStaleAgentRows` at
`packages/agents/shared/agent-row-reaper.ts:171`.

The census is the shared population for `check-liveness-census`,
`check-liveness-routing`, `check-liveness-collapse` and `check-liveness-subject`, each
of which states in its own header that it adds no second instrument and reads the
census's catalogue instead. `routingVocabulary` in `liveness-routing.ts` adds every
`carries-verdict` signal to its `verdict` set without checking that anything declares
it, so this id sits in that set on every run and matches nothing.

Nothing reports it. A catalogue entry that never matches is indistinguishable, in
every green run, from one that matches nothing today because the tree is clean — which
is the failure mode this whole family of gates was built against, occurring inside
their shared denominator.

Found while ingesting `dirty/docs/liveness-routing.md`, whose own copy of that
three-decider list had already lost a different member.
