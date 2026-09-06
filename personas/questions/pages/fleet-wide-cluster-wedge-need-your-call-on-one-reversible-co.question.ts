import type { Question } from "../question.page-type.ts"

export const fleetWideClusterWedgeNeedYourCallOnOneReversibleCo = {
  id: "019f9509-b55a-73ac-a507-167c5423cde3",
  pageTypeSlug: "question",
  slug: "fleet-wide-cluster-wedge-need-your-call-on-one-reversible-co",
  ask: "Fleet-wide cluster wedge — need your call on one reversible command. node-03 (a control-plane node) was cordoned via kubectl at 16:38:56 UTC (~12 min ago) and is still Ready but SchedulingDisabled. There's NO active upgrade plan/controller and the node never rebooted, so this looks like a manual cordon from the maintenance window that never got its uncordon. The problem: registry, git-transport, and a postgres replica are storage-bound (PV node-affinity) to node-03 and can ONLY run there — so the cordon strands them Pending. Registry being down is driving a cluster-wide ErrImagePull cascade: ~23 workers crashlooping (points workers, orchestrator, ci-pod-dispatcher, merge-queue-coordinator, reapers, notifiers) plus pipeline subscriber lag, and it's still spreading to newly-scheduled pods. Fix is one reversible command: kubectl uncordon node-03 (re-cordon reverses it). Is that cordon deliberate maintenance still in progress (I HOLD and leave it), or stuck/forgotten (I UNCORDON now to clear the fleet)?",
  askedBy: "dalla",
  askedIn: "019f8b5b-33ff-79c7-a6a8-cbbc351eecc6",
  status: "answered",
  offered: ["Go — uncordon node-03 now", "Hold — deliberate maintenance, leave it cordoned"],
  answer: "Go — uncordon node-03 now",
  closedAt: "2026-07-24T16:53:07.010Z",
  context: "txt",
} as const satisfies Question
