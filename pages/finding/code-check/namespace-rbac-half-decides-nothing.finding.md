---
id: cd9a83a8-21ec-5e95-ba4b-0a357ee7958c
slug: namespace-rbac-half-decides-nothing
page-type-slug: finding
title: "Namespace rbac half decides nothing"
domain-slug: domain/global
---

# Claim

The per-namespace half of the RBAC gates decides nothing: every tuple any namespace Role grants is already granted cluster-wide, so the ClusterRole fallback answers every namespace lookup and the gap arm cannot fire.

# Evidence

Measured by the parent of tree #18682 on branch `project-18682`, from an archive of the branch, over the real profile and rule sets rather than from reasoning about the generator.

Building the ClusterRole's unscoped `(apiGroup, resource, verb)` tuples from `clusterRoleRules`, and the namespace tuples from every rule of every profile `getAllProfiles()` returns:

- 28 profiles, 138 rules, 139 distinct namespace tuples
- 229 unscoped ClusterRole tuples
- **0** namespace tuples fall outside the ClusterRole

The instrument was shown able to report a nonzero: an invented tuple `fake|widgets|frobnicate` is correctly counted as outside.

The cause is structural rather than incidental. `--check` forces the ClusterRole to hold every tuple any namespace Role grants, so the two sets cannot diverge by construction. No arrangement of profiles produces a namespace grant the ClusterRole lacks, which means the gap the arm exists to find cannot exist while that constraint holds.

Two projects reached this floor independently. #18631 measured it on `--check-manifests`: all 18 namespaced kinds in play already carry a cluster-wide create+patch grant, and the two the review expected to be live, `LimitRange` and `ResourceQuota`, are emitted by no synth. #18632 measured it on `--check-pipelines` and reported 0 of 1166 namespace tuples outside the unscoped grants.

This does not say the RBAC gates are inert. Both projects landed arms that fire. It is the namespace-versus-cluster comparison specifically that decides nothing.

What has to be settled, and by somebody holding the check's subject rather than a row inside it: whether the per-namespace machinery should be removed under Removal First, or whether the `--check` constraint that flattens it is the thing to change so that namespace Roles can be narrower than the ClusterRole. Making the arm more correct without settling that keeps a gate nobody can trigger.
