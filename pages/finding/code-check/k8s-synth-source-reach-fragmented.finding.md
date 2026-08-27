---
id: 674af9e6-14bd-5a70-8477-0e8e6038e9b7
page-type-slug: finding
title: "K8s synth source reach fragmented"
domain-slug: domain/global
---

# Claim

The k8s synth-source reach that Zero At Landing dispatch depends on is spelled by hand in three places — the k8s CLI's `DISCOVERY_GLOBS`, `check-configs-k8s.ts`'s `k8s-synth.paths`, and the producer's own constant — and `discoverSynthFiles` walks only one hardcoded directory, reaching 24 of 51 `synth.ts` files in the tree and missing the founding incident's own authoring site, `packages/temper/web/deploy/k8s/synth.ts`, along with every other product-side synth source.

# Evidence

Project #18679, domain code-check, initiative code-check. Split out of #18512 by dalla on 2026-08-10, carrying that child's measurements; #18512 keeps its two delivered objectives and closes.

Wanted: (1) the k8s synth-source reach stated once with every consumer deriving from it; (2) a commit touching any k8s synth source waking the checks that judge it; (3) checks whose population widens landing with what the widening finds already fixed, not frozen behind a ratchet or allowlist.

Measurement (taken 2026-08-10 from packages/shared/graph/producers, evidence not fact — re-measure before planning): discoverSynthFiles reaches about 24 of 51 synth.ts files; the comment on check-configs-k8s.ts's k8s-synth.paths says it must mirror DISCOVERY_GLOBS by hand; the producer's own constant is narrowest of the three.

Why this sat out of tree #18484: the change moves a shared graph whose Zero At Landing bill lands on check-memory-qos, check-k8s-node-selector and check-rbac — not #18512's own checks — inside a branch fifty-odd seats were working in, with reds attributed to nobody. Weighed against tree #18682 on 2026-08-11 and kept out on that ground; half the original reason (settling a check by implementation before its review) has since expired because every registered check now carries a settled verdict.

Already landed under #18512, not this project's to redo: the registry dispatch was widened and verified through the real closureIntersectsChangedFiles (synth.ts and images.ts flip false to true); the manifest scanner now reads an image spelled as its container entry's head line (two live Deployments used that spelling and had been scanning to nothing); preparation-build-graph now depends on preparation-synth-k8s, closing a race whose loser was cached by tree sha and reused for every later pipeline — that race had 98 of 255 members reading as empty, so the gate reported a clean pass over members it had read nothing from.
