---
id: 019f3a5d-11e2-7c40-b8a7-4d19ee73c5b2
page-type-slug: finding
title: "A cold build blocks every route including health"
domain-slug: domain/graph-system
---

# Claim

While the graph service builds a snapshot it answers nothing at all, `/health` included. The build reads every file through a synchronous git call, so the event loop is stalled for the whole build. A health check taken during one reads the service as down, and a restart on that reading would begin another cold build.

# Evidence

At 2026-08-22, immediately after the service restarted onto a new commit, `curl -m 20 http://127.0.0.1:8788/health` returned nothing and exited 28. `systemctl --user status graph-service` at that moment showed the unit `active`, with a child process `git -C /var/home/walton/repos/code show 0e6e760a9d...:packages/temper/game/codec/package.json`. Fifteen seconds later the same call answered normally. Nothing was wrong with the service: it was building.

The blocking is not inferred. `tools/lib/graph/repos.ts` line 26 defines `runGit` on `execFileSync`, and line 116 calls it as `runGit(root, ["show", ` + "`${ctx.commit}:${path}`" + `], "reading a file at a commit")` for every file a producer reads. `execFileSync` blocks the thread, and the service is one Bun process serving on one loop, so every read holds every route. A build over both repositories reads thousands of files.

What makes it worth recording rather than fixing in passing: the failure reads as the opposite of what it is. A service that answers nothing looks dead, and the reading is taken exactly when the service is doing the work it exists for. The restart such a reading would trigger discards the half-built snapshot and starts again, so a service under health checking during a cold build could be held permanently in the state that makes it look broken.

Measured before: a cold build runs about 87 to 89 seconds. The client's own ceiling is 300 seconds and it does not retry, so a caller that asks during a build waits rather than failing. It is the health check, not the caller, that misreads this.

Worth deciding: whether the file reads move off the synchronous call, or whether health is answered from somewhere the build cannot stall.
