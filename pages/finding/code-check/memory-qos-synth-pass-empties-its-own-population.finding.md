---
id: c4ba9b69-ff12-5532-bc3e-fac5c01c69a3
slug: memory-qos-synth-pass-empties-its-own-population
page-type-slug: finding
title: "Memory qos synth pass empties its own population"
domain-slug: domain/global
---

# Claim

`check-memory-qos` can certify a population its own graph emptied: the synth node producer hands every manifest zero container probes, so a run served by that pass reports `over N of N container probes` while judging none of the containers those manifests declare.

# Evidence

Read while verifying #18538 on `project-18484` at `d0a6756749`, 2026-08-10.

`packages/shared/graph/producers/src/k8s/k8s-synth.node.producer.ts:69` sets `containerResources: []` on every node it builds, commented as a fallback carrying "no node-targeting detail" while `generated/*.yaml` is unmaterialized. `check-memory-qos` builds its population from exactly that field (`check-memory-qos.ts:186-189`), so a graph served by the synth pass yields no probes for those documents.

The two failure shapes differ in what they say. A run over an unmaterialized worktree reads `over 9 of 9 container probes` and exit 0 — which I ran — and 9 is the whole population it could see, so the line is honest about the walk and silent about the pass that shortened it. The exposure is that the check's own denominator cannot distinguish "these manifests declare no containers" from "the producer that reached them declares none for anything", and the deployed workloads whose sizing #18538 repaired live in `generated/*.yaml`.

Not established here: whether a real SHA-pinned CI run is served by the synth pass or by the YAML pass after `preparation-synth-k8s` materializes the manifests. If CI always materializes first, the hole is local-only and the cost is a check that reads green on a developer's machine for a reason it does not state. Nothing ran in branch CI from this seat.

Adjacent, same file class: `packages/infra/checks/src/checks/check-memory-qos.ts` carries 13 allowlist entries whose paths are `generated/*.yaml`, and `check-repo-paths` cites every one of them in a worktree where those files are absent.
