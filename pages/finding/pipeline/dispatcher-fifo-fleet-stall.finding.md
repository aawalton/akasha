---
id: 9c8bd99f-c419-5fd1-b965-820c9250f0c0
slug: dispatcher-fifo-fleet-stall
page-type-slug: finding
title: "Dispatcher fifo fleet stall"
domain-slug: page-type/pipeline
---

# Claim

The ci-pod-dispatcher binds a step to a node and then FIFO-holds the entire admission line when that bound node is full, even when another CI-labeled node has room on the same tick, so a transient shortage on one node becomes a fleet-wide stall; separately, a kubelet-rejected pod (OutOfcpu) leaves its step row stuck at status=running with no reconciler, and `force-fail-step` does not recompute a workflow's aggregate status when the force-failed step is the last non-terminal one.

# Evidence

From project #16195 (domain: pipeline). Credit ember, who read the dispatcher's own log after her kubectl-events diagnosis proved peripheral.

DISPATCHER'S LOG: `placement defer pipelineSeq=25870 node=node-04 request=512Mi/750m boundRem=23Mi/7230m boundMaxFree=5143Mi/10730m — bound node full, FIFO admits oldest first`. boundRem reconciles with kubectl; boundMaxFree names a node able to host the step now.

MEASURED, ~14:30Z: node-04 99.9% mem, 23Mi left; node-06 14%/37%, idle the whole stall. CI namespace used ~14% of CI-labeled capacity: misrouted admission, not scarcity.

WHY NOTHING OPERATIONAL FIXES IT: node-04's occupants were legitimate work; freeing 4Gi at 14:17Z drained the queue by one step in 43s, then the next bound step took the space — a bailing bucket, not a pump. node-02 ruled out (hosts production CNPG postgres, 66% committed). Removing CI labels from node-01/node-05 rejected: removes ~35Gi from a memory-bound pool.

CONSEQUENCE: toolchain waits reaching 27min; three typesafety shards on 25857 failed with capacity-starved:node-04, indistinguishable from a code failure; merge-queue/staging blocked behind it.

SECOND DEFECT, same chain: kubelet rejects dispatcher-admitted pods with OutOfcpu; the pod is cleaned up and the step row left status=running, podName pointing at a deleted pod — fit-before-create races node state. Pipeline 25868 hung 40 minutes with 92/93 steps done this way, orphan unreconciled.

THIRD DEFECT: force-fail-step does not cascade. Force-failing 25868's orphaned step made all 93 steps terminal, but the workflow read running 90s later, retry refusing since the pipeline was not terminal — the documented alternative to an out-of-band pod delete leaves the pipeline stuck exactly here.

REMEDY, not decided: (1) admission must let the line's head yield to a step fitting elsewhere, or rebind; (2) an OutOfcpu pod must reconcile its row; (3) a terminal write must recompute workflow status. Related, node-04 memory: project #16189.
