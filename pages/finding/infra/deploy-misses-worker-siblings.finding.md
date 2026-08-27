---
id: f566b968-f526-536b-8178-7e135b548a29
page-type-slug: finding
title: "Deploy misses worker siblings"
domain-slug: domain/global
---

# Claim

A deploy does not reach a long-running worker sibling. The pod's checkout updates, but each sibling process holds the modules it evaluated when it was last spawned, so it runs stale code until it happens to restart, and nothing reports the gap.

# Evidence

Observed on 2026-08-09 and 2026-08-10 during project #18236, which renamed the seat holding Alan's inbound path and moved the name every addressing constant resolves.

The `gmail-new-mail` watcher is a sibling process inside the `worker-supervisor` Deployment. The supervisor discovers each `*.worker.ts` by filename stem at boot and spawns it with `Bun.spawn`; there is no per-worker Deployment. A sibling therefore evaluates its imports once, at spawn.

The deploy landed at about 23:32 UTC and updated `/app/repo` inside the pod. The pod was not rolled by it: it read 5d5h uptime with zero restarts at 23:45 and 5d21h with zero restarts at 15:24 the next day. The gmail sibling running at the time of the cut had started at about 22:38, four minutes before the rename, so it went on holding the pre-rename seat name while the checkout beneath it said otherwise.

The effect on Alan was a live outage. Mail arriving after the cut was processed and archived, and the notification went to a name that resolved to no agent row. A probe email sent to his own address at 23:47 left his INBOX and produced no delivery to any seat — so the window did not merely delay his mail, it consumed it.

It healed by luck rather than by design. The sibling restarted on its own at some point before 01:27, when a surface delivery first landed on the new name, and had restarted again by 15:24. Nothing made it restart, and nothing would have reported it if it had not.

The wake-watcher daemon on the workstation is the same shape and was caught during that project, because its systemd unit anticipates a restart onto a landed SHA. The in-cluster siblings have no equivalent, and the reasoning that found the first does not reach them from anywhere.
