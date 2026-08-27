---
id: 6a9072a6-187f-5cfe-b316-90c4f1ea83a7
page-type-slug: finding
title: "Daemon staleness no detector"
domain-slug: host/workstation
---

# Claim

Workstation systemd `--user` units running repo code (the known instance: `pages-fs-projector.service`, `ExecStart` running `bun ops pages-mirror run`) hold whatever main contained at their `ActiveEnterTimestamp` indefinitely, since bun does not hot-reload and `Restart=always` fires only on process exit — a merge to main changes nothing about the already-running daemon, and no pod rollout, deploy step, or cluster-side staleness probe reaches this class of process at all.

# Evidence

Project #16349 (workstation, someday_maybe, live-on: commit). No initiative named.

Split out of #15925 (áine's owner review, worker-15925, 2026-07-25). #15925 ships the deployed-estate half of "running code != committed code" (liveVersion==commitSha of most recent terminal MAIN pipeline whose workflow ran) — ready; this third is not, since #15925's own note calls its enumeration "unknown until built."

Location: workstation systemd `--user` units running repo code. `pages-fs-projector.service` (`packages/shared/dotfiles/.config/systemd/user/pages-fs-projector.service`), workstation not cluster. Verified live by aranya 2026-07-25: `ActiveEnterTimestamp = Sat 2026-07-25 10:54:57 MDT`, `MainPID = 2156` (active), `WorkingDirectory = /home/walton/code`, `ExecStart = bash -c '... exec bun ops pages-mirror run'`, `Restart = always` (fires only on exit). Bun doesn't hot-reload, so the process holds whatever main contained at its start timestamp indefinitely; no pod rollout, deploy step, or cluster-side staleness probe reaches it.

Concrete instance: #16240 retunes this worker's interval 60s to 1h; the change lands in main and the daemon keeps ticking at 60s until a manual `systemctl --user restart`.

Scope needed: enumerate workstation systemd `--user` units whose `ExecStart` runs repo code (pages-fs-projector known; enumeration unbuilt), compare each `ActiveEnterTimestamp` against the last commit touching its code, alert to #15925's place. Not proposing auto-restart. Sibling row: same principle, different mechanic (systemd timestamp vs. deployed sha) — build #15925's half first, reuse its verdict/routing.

Related: surfaced by #16240's worker generalising a question aranya raised about `pipeline-worker`'s deploy path; three deploy locations known for long-running workers: supervisor children (worker-supervisor pod), own Deployments (`pipeline-worker`, `@infra/ci-orchestrator`), this one. Post-land restart for #16240: an owed ping on aranya, not this row.
