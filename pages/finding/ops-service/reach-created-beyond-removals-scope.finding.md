---
page-type-slug: finding
slug: reach-created-beyond-removals-scope
title: "ops service install writes cluster objects its removal pass never walks"
domain-slug: domain/ops-service
---

# Claim

`ops service install` writes cluster objects that its own removal pass can never reach, so every reach it creates outlives the document that asked for it.

The command has two halves. It composes systemd units for a workstation service, and where that service's document states a port and a namespace it also gives the cluster a Namespace, a selector-less Service and an EndpointSlice addressing this workstation. Its removal pass walks only the first half: the units it owns, those linked into systemd from them, and the hand-written ones under the checkout it replaces. Nothing walks the second half, and the apply that creates them carries no prune.

The consequence is not a leak of inert objects. An EndpointSlice written by hand has no owning Service to reconcile it and no controller to mark it unhealthy, so it declares `conditions.ready: true` for as long as it stands, whatever is or is not listening at the address it names. A retired service therefore leaves behind a name that resolves, an address that answers a TCP reset, and a readiness claim that nothing in Kubernetes contradicts.

No document now states a port or a namespace, so the half that creates these can no longer fire, and the half that would remove them never could.

# Evidence

The creating half is `applyToCluster` at `tools/lib/service-cluster-reach.ts:99-105`: `kubectl --request-timeout=30s apply -f -` over the three documents `manifestFor` builds at `:34-79`. There is no `--prune`, and no delete path anywhere in the module. The removing half is described by the command's own document, `pages/old-ops-command/ops-service-install.old-ops-command.md:43-53`, which scopes removal to "every one standing in its own directory, those linked into systemd from it, and the hand-written ones under the instructions checkout that this command replaces" — units throughout, no cluster object named.

`manifestFor` sets `conditions: ready: true` as a literal at `service-cluster-reach.ts:72-73`, and `app.kubernetes.io/managed-by: ops-service-install` at `:50` and `:66`, from `MANAGED_BY` at `:4`.

Two objects stood as specimens. `page-query-service/page-query-service` on `10.100.134.88:8787`, nine days old, and `graph-service/graph-service` on `10.103.212.34:8788`, six days old, each with an ownerless EndpointSlice addressing `192.168.68.50` and `ss -ltn` blank on both ports. A live `alanwalton/web` pod logged 47 failures against the first in six hours of real traffic, each reading `gave no answer within 5000ms (Error: Unable to connect...)` — the connection was refused at once, so the five seconds is the caller's budget quoted in its own message rather than a measured wait.

That the creating half can no longer fire was checked by parsing the frontmatter of all 35 `*.workstation-service.md` documents: none states `port` or `namespace`. `planClusterReach` at `service-cluster-reach.ts:107-126` therefore returns an empty map. `tools/tests/service-cluster-reach.test.ts` has two failing cases that say the same thing from the other side — one asserting at least one document composes a manifest and receiving zero, one seeking a `graph-service` document that no longer exists.

Both specimens were deleted after this reading, with their manifests captured first, so the two objects are no longer in the cluster to re-examine. The asymmetry in the code is unchanged by that.

NOT MEASURED. Whether any earlier retirement left a third reach behind in a namespace nobody has thought to look in; only the two named namespaces were examined, and no cluster-wide search for the `managed-by: ops-service-install` label was run. Whether `graph-service` ever served traffic, or on what date either stopped. Whether the systemd half of the command is sound — it was not exercised. Whether anything outside this repository still resolves either name.
