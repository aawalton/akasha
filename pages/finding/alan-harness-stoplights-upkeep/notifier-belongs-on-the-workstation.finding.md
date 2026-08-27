---
id: 0ebeb367-e38b-5658-bb07-6183ac2b3c93
slug: notifier-belongs-on-the-workstation
page-type-slug: finding
title: "The surplus-fall notifier is an eighth worker of the class ruled to port onto the workstation"
domain-slug: readout-group/upkeep
---

# Claim

The surplus-fall notifier is an eighth worker of the class already ruled to port onto the workstation, and it is the cheapest of them to move.

# Evidence

Found on 2026-08-21, while taking the last individual stoplight names out of the code repository.

`packages/alanwalton/apns-push-notifier/src/surplus-fall-notifier.worker.ts` watches one of Alan's stoplights and pushes his phone when it falls a rung. It carries the `.worker.ts` suffix the supervisor scans for, and it refuses to start unless it finds itself in the cluster.

Alan ruled on 2026-08-19 that seven workers of that class port onto the workstation, named by that ruling as `aria-story-points`, `iris-tower-points`, `erin-chess-points`, `ceri-points`, `zadi-points`, `nova-words-read` and `alanwalton-daily-tracking`. This one was not among them. On 2026-08-21 Alan read it and said it sounds like a workstation service, which is the same call.

Two domain lines already reach it. Only code deployed off this workstation belongs in the code repository, and everything in Alan's harness changes without a deploy. A notifier deciding when his phone lights up is his harness, and today changing when it pushes costs a deploy and an app rollout.

The hazard the earlier ruling recorded is that a worker ported and removed from `packages/` keeps running in the cluster from the last deployed build, so both copies run until a deploy retires the pod, and nothing reports the overlap.

This worker is the cheapest of the set to move under that hazard, and the reason is worth stating: it already claims a dedupe row before it pushes, keyed by day and by rung. Two copies racing claim the same row, so one wins and the other sends nothing. Where a double-running points writer writes a day twice, a double-running notifier is absorbed by a mechanism already there. That should be verified rather than assumed, but if it holds, this is the one to port first and learn on.

One thing that does not port with it: the reading it compares against. It reconstructs what the surplus was when the day opened, because nothing records what any reading was at an earlier moment.
