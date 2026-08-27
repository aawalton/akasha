---
id: 3ee6d379-a937-5714-b8b0-d50f7957568e
slug: move-leaves-pins-pointing-at-the-old-path
page-type-slug: finding
title: "Move leaves pins pointing at the old path"
domain-slug: barred-meaning/pin
---

# Claim

A pin stores the paths its slug resolved to when it was taken, and nothing repoints them when one of those surfaces moves. The agent that performs the move is additionally the one seat the notification channel deliberately excludes, so the pin most certain to be stale is the one least likely to hear about it.

# Evidence

Measured 2026-08-05 against `~/instructions` at HEAD, and observed on this seat during the move it describes.

`tools/lib/pins.ts:91` documents the store as a snapshot: `surfaces` is "the surface it resolved to and everything standing above that, repository-relative, **as the tree stood when the pin was taken**". Nothing re-resolves it on read — `pin.ts --show` prints what is stored. Nothing rewrites it on a move either: `rg -n 'pin' tools/mv.ts tools/lib/verb.ts` returns one comment about commit bookkeeping and no write to the pin store.

Observed directly. Commit `512887733728446a987e76e5f42ecfc643fedb3e` moved `tasks/lead/define-task.md` to `tasks/general/define-task.md`. This agent was pinned to task `define-task` at the time. Afterwards `bun tools/pin.ts --show` still printed `tasks/lead/define-task.md` under the task axis. Re-pinning with `--task define-task` resolved it to the new path, which is what cleared it.

The notification does not reach the mover, by construction. `tools/lib/notify-readers.ts:104` reads `if (agent === self || agent.includes(SUBAGENT_MARK)) continue`, and its header states the exclusion as intended: "one whose record already names the landed body has nothing stale, which is how the writer excludes itself twice over." That argument is about a body — after an edit the writer has read what landed. A move changes no body, and what goes stale is the path in the pin store, which the writer's read record says nothing about. Sound for `write` and `edit`; it does not reach `mv`.

The door reported `notify: 12 pinned agent(s) told what moved under them` against 16 live seats.

Not measured: whether `hold-identity` refuses or passes over a pin naming a path that no longer exists. The two edits made between the move and the re-pin were not inspected for that gate's line.
