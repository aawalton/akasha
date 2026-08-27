---
id: 0f159ac7-cf5f-54ce-9db5-c93729cc17d0
page-type-slug: finding
title: "A failed mirror writes no signal any reader sees"
domain-slug: domain/git-repos
---

# Claim

A mirror run reports nothing a reader ever sees, so every GitHub copy fell behind
unnoticed. The hook announces itself into a per-repo `mirror.log` and then hands the
push to a detached child; `mirror.state`, the machine-readable signal the hook exists
to write, has never been written for any repository. Neither has an error line. A
mirror that stopped and a mirror that never ran look identical from outside the pod,
and the only way to tell is `kubectl exec`.

# Evidence

Measured 2026-08-25 20:40-20:46 UTC in `git-transport-646dd5f79b-s5sr2`, against the
seven bare repositories under `/data/git/repositories/alan`.

Five of the six mirrored repositories were behind their cluster tip: `books`,
`code`, `instructions`, `stories` on branch tip, `memory` on its snapshot lineage.
`instructions` on GitHub read `2125aeaff1` while the cluster read `344baf84a1`.
Only `akasha`, created that hour, was not yet stale.

`mirror.state` was absent from all seven, including repositories whose `mirror.log`
carried six announce lines. `mirror.log` carried announce lines only — no ok, no
fail, no ERROR — for every repository.

The cause is not the credential, the destination or the network. `GITHUB_ACCESS_TOKEN`
was present in the hung process's own `/proc/PID/environ` at 93 characters with
`GIT_TERMINAL_PROMPT=0`; `git ls-remote` against `code` returned 542 refs in 1 second;
a plain HTTPS request to github.com returned 200. Running the hook's own push command
by hand completed in under a second for `akasha` and in 3-7 seconds for each of the
four stale history-mode repositories.

`memory` additionally held `refs/heads/mirror-root.lock`, a zero-byte file dated
2026-08-25 01:45, while `refs/heads/mirror-root` itself did not exist. Every snapshot
run since had failed on it.

Pushes spawned by the hook accumulate: three concurrent `--all --force --prune` pushes
of `instructions` were running at 20:44. Zombie processes in that container went from
145 to 361 across twelve minutes of observation; pid 1 is `bun --watch`, which does not
reap. `pids.max` for the cgroup reads `max`, so nothing bounds this from the cgroup.

NOT MEASURED: why the detached child produces no record while the same command run by
hand succeeds. Whether the hook's shell is killed when the hook returns, leaving the
push orphaned and the reporting half dead, is a hypothesis I did not test. How long
each repository had been stale, beyond the `memory` lock's 19 hours. Whether the zombie
growth is caused by the mirror hook or by something else in the container.
