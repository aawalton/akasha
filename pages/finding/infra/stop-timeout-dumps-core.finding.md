---
id: 8e51038e-f790-5dbd-80b2-5401ff07ddb1
page-type-slug: finding
title: "Stop timeout dumps core"
domain-slug: domain/global
---

# Claim

Every systemd user unit on this workstation runs with `TimeoutStopFailureMode=abort`, which no unit
file sets, and no bespoke unit here declares a `TimeoutStopSec` of its own. The 15s default is the
only bound, and a service overrunning it is SIGABRTed into a core file rather than killed quietly.
That core file is the only signal: once the unit restarts, `Result=success`, so a daemon that has
never once stopped cleanly reads exactly like one that always does.

# Evidence

`systemctl --user show <unit> -p TimeoutStopFailureMode` answers `abort` for `alan-email`,
`memory-reaper`, `temper-watcher` and `code-editor`. The setting appears in no file under
`~/.config/systemd/user/` or `/etc/systemd/`, so it is this build's default rather than anyone's
choice here. Where it actually comes from, I did not find.

Watched directly on 2026-08-13: `alan-email.service: Killing process 1682412 (bun) with signal
SIGABRT` fifteen seconds after `Stopping`, then `code=dumped, status=6/ABRT` and `Failed with result
'timeout'`. `coredumpctl` held 144 SIGABRT entries at that point.

The same symptom had two unrelated causes on the same day, which is why this is filed against the
default rather than against either one. `tools/email-watch.ts` parked in an uninterruptible
`Bun.sleep(60_000)` and could not read its own abort flag in time — repaired in `bea90973`, and four
restarts after it stopped cleanly with no new dump. Separately, `pages-fs-projector` ran
`worker-runtime`, whose `SHUTDOWN_DRAIN_DEADLINE_MS = 25_000`
(`packages/shared/worker-runtime/src/run-long-running-worker.ts:97`) exceeds the 15s systemd allows;
that unit has since been removed, but the deadline still stands for every other worker on that
runtime.

Not measured: whether this default reaches system units as well as user units; whether anything
outside this workstation is affected; and what any of the 144 core files contain — they were counted
and none was opened. `code-editor`, `temper-watcher` and `memory-reaper` show zero stop timeouts and
zero dumps since 2026-08-01, so nothing here is currently overrunning.
