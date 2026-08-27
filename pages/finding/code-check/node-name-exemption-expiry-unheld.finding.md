---
id: 93733a03-3b90-5482-99ad-f9f5bf8621ce
page-type-slug: finding
title: "Node name exemption expiry unheld"
domain-slug: domain/global
---

# Claim

The one tracked `nodeName` exemption in `check-k8s-node-selector` names an expiry nobody works.
`NODE_NAME_ALLOW` exempts voice-infer's synth source and its generated manifest, and the comment
above it offers #16060 as the exemption's expiry. #16060 stands at `someday_maybe`, a status no
seat is dispatched against, so the exemption reads as time-bounded and is not. Voice-infer is now
the only module in the rule's derived reach carrying a pod-spec `nodeName`.

# Evidence

Found while verifying the hand-back of project #18521, in the worktree `/home/walton/worktrees/18484`.

**The exemption and what it names.** `packages/infra/checks/src/lib/k8s-node-selector.ts` lines
171-189 — the docblock above `NODE_NAME_ALLOW` names #16060 as the exemption's expiry. The set
holds `packages/infra/voice-infer/k8s/synth.ts` and
`packages/infra/voice-infer/k8s/generated/deployment.generated.yaml`.

**The row's status.** `ops project show 16060` — owner `dalla`, status `someday_maybe`, intake
stamped 2026-07-25, last updated 2026-08-04. Title: "voice-infer pins by nodeName with no honest
hardware attribute to replace it — its stated Pascal sm_61 requirement is contradicted by its own
Containerfile, and the honest >=8GiB attribute would let a resident Deployment permanently starve
upscale off node-06".

**That it is the only one left.** Walked all 14377 `.ts`/`.tsx` files under `packages/` (the
check's own excluded-segment set applied) and asked `authorsPodSpecTs` of each: 59 modules are in
the `ts-node-name` rule's derived reach, and exactly one of them contains a pod-spec `nodeName`
key — `packages/infra/voice-infer/k8s/synth.ts`. `scanTsNodeName` over the whole in-reach set
returns 0 violations, which is the allowlist absorbing that one site.

**Why the allowlist rather than a repair.** The exemption's own comment states the constraint
holding voice-infer on its card is an allocation rather than a hardware attribute, so rewriting
the pin as a `workload-class` or GPU-capacity selector at that site would assert something untrue.
The repair is #16060's, which is why this is filed rather than fixed.
