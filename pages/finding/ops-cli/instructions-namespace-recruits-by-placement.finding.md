---
id: 0465d2ef-e014-5e48-9fbc-7e01f695ceb9
page-type-slug: finding
title: "The ops instructions namespace recruits by file placement rather than by subject"
domain-slug: domain/ops-cli
---

# Claim

The `ops instructions` namespace recruits by file placement rather than by subject, so it holds six commands that have nothing to do with the instructions repository.

Its definition claims a subject; its Design decides membership by where a file sits. Those two do not pick out the same set, and the placement rule wins, because that is what the dispatcher reads.

# Evidence

`ops instructions` lists these six commands, none of which reads or writes the instructions repository:

- `alert-observer-daemon` — sweeps the alert event stream
- `devops-monitor-daemon` — classifies the fleet and the pipeline
- `filler-drain-daemon` — drains the filler queue
- `memory-reaper-daemon` — reaps fleet memory
- `wake-watcher-daemon` — watches seats and restarts the ones that stopped
- `fun-points-reconcile` — books a completion snapshot onto a daily-tracking row

`fun-points-reconcile` books a daily-tracking row. `memory-reaper-daemon` operates on the memory repository. Each is in this namespace because its file sits at `tools/<name>.ts`.

A seventh, `claude-account-upkeep-service`, was moved out on 2026-08-18 at Alan's direction, to `ops claude-account upkeep-service` with its file at `tools/commands/claude-account/upkeep-service.ts`. Nothing broke: its systemd unit had invoked the file by path, and now invokes it through `ops`. That move is the evidence that the rest can follow the same way, one at a time.

The cost of leaving it is that `ops instructions` reads as two things at once — the instructions repository, and whatever happens to live in `tools/`. A reader looking for the process that renews OAuth tokens had no reason to look under `instructions`, and a reader browsing `ops instructions` met six commands that told them nothing about the namespace they were reading.

`domains/code-quality.md` already carries the rule this would satisfy: **Domain Directory** — "Put new code in a directory named for its subject, never in one named for what it does."
