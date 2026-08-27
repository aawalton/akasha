---
id: 78209792-ea89-57b5-a638-6ad93b5c036c
slug: ci-enrollment-candidate-no-weight
page-type-slug: finding
title: "CI enrollment candidate no weight"
domain-slug: domain/node
---

# Claim

`alanwalton.com/ci-enrollment: candidate` reads as a scheduling gate but carries zero scheduling weight, and its own owning document already says so.

# Evidence

WHAT IT IS. `alanwalton.com/ci-enrollment: candidate` (CI_ENROLLMENT_KEY, ciEnrollmentCandidateLabel, hostnames-ci-enrollment.ts) is a paper-trail marker from the #14382 multi-node branch-CI rollout. @infra/k8s-types' own CLAUDE.md states plainly it "carries zero scheduling weight," its key is deliberately disjoint from the workload-class namespace, and it is none of check-k8s-node-selector's sole-sourced selector keys.

WHY IT READS AS A GATE. It is a node label in the same alanwalton.com/ namespace as workload-class (which IS a gate), with a value ("candidate") implying eligibility. Live, it is set on node-01, node-03 and node-05 — exactly the control-plane set, a coincidence making it look like a deliberate, alarming routing decision.

MEASURED COST, 2026-07-25, within one hour: read as the mechanism routing branch CI onto the control plane and reported to a peer lead, having already read the "zero scheduling weight" sentence — retracted before it spread further. The same peer had independently carried the same wrong forward. Two leads, two wrong mechanisms, one label, one hour.

Disproven at a glance: node-04 carries NO enrollment label and runs branch CI step pods. The actual gate is in code — select-next-placement.ts filters `nonReserved = orderedNodes.filter(n => n !== CI_RESERVED_NODE)`.

CANDIDATES, not a decision: (a) remove it — the rollout is done, git history holds the record; (b) rename to something that cannot read as a gate (e.g. a `.../rollout-cohort` key outside the scheduling-label namespace); (c) give it real weight, making it the actual branch-CI member gate in place of the in-code CI_RESERVED_NODE filter — interacts directly with #16280 and node-06 reservation, must not be chosen in isolation.

Do not bundle with the node-06 reservation work: that is a live design tradeoff, this is a marker cleanup, and deciding them together lets the cleanup ride in on the reservation's urgency unjustified.

Was #16285, domain node.
