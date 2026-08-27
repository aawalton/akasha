---
id: e285bf27-bebf-56c4-b665-04d1fff9a36f
page-type-slug: finding
title: "CI flip blocked on relocation"
domain-slug: domain/node
---

# Claim

The `check-ci-class-disjointness` check (`packages/infra/checks/src/checks/check-ci-class-disjointness.ts`) remains warn-only because the merge-queue control plane's placement onto a CI-class node is structural rather than a stray label, so flipping the check to enforce is blocked on relocating that workload rather than on a change to the check itself.

# Evidence

Project #16215, domain `node`, `someday_maybe`, captured but never defined (no objective; text moved from retired `notes` on 2026-08-15).

Successor to #16149, which landed `check-ci-class-disjointness` warn-only (reports, exit 0) because the invariant is genuinely violated today and an enforcing gate cannot land (`bun ops project deploy` needs branch CI green). dalla's ruling 2026-07-25 attached this row as the binding constraint: a warn-only check with no filed successor reads as permanent after ~a week.

Flip is one line in `packages/infra/checks/src/checks/check-ci-class-disjointness.ts`: swap `reportViolations(...)` for `exitOnResult(...)`; the rule is unchanged.

Blocker: node-05 hosted both `ci` and `workers` classes (`packages/infra/talos/src/nodes-main.ts`). Not a label edit: live `deploy/worker-supervisor -n workers` carries `nodeSelector {ci:true}` that `packages/infra/ci/orchestrator/k8s/synth.ts` never declares — the merge-queue control plane is placed by the CI membership label, so relabeling node-05 just relocates the co-tenancy to another ci node.

Flagged as unresolved IaC drift at filing (synth.ts header falsely claims "no node targeting"); #16218 later closed this: the selector is structural (forced by a node-local `ci-storage` hostPath), not drift. Also flagged: stale synth.ts header line 7 pointing at a nonexistent nodeSelector.

Done-when: no node declares ci alongside an incompatible class, the check script reports zero violations, and it is flipped to exit 1 with this row's reference removed.

2026-07-25T21:59Z update (aranya, live PodPending alert): overlap is node-01 AND node-05, not node-05 alone — both are control-plane nodes that are also ci-class, so moving CI off node-05 alone does not establish disjointness. A second victim class ("CI blocks a ground-layer service's rollout, not just control-plane responsiveness") was flagged but the capture was cut before any detail was recorded.
