---
id: edd19b3d-c5ab-5630-9fcf-e9ceb2cab39c
slug: pid-signal-declared-twice
page-type-slug: finding
title: "Pid signal declared twice"
domain-slug: domain/supervisor
---

# Claim

`tools/lib/pid-alive-or-refuse.ts` declares its own copy of everything
`tools/lib/pid-signal.ts` exports — the fold table, `readPidSignal`,
`classifyPidSignalError`, `CollapseRefused` — and imports nothing from it. Two classes named
`CollapseRefused` therefore stand in one process, and an instance of one is not an instance
of the other. No file imports both, so a reader of either has nothing in front of it saying
the other is there.

# Evidence

Met on #19324 while porting the gateway's `state-file.ts`, which declared its own
`isPidAlive` over `pid-signal`. `pid-alive-or-refuse.ts` already held that function whole,
so the port re-exports it; reading it to check is how the duplication came up.

Measured against the two files as they stand at `2cca7cf13`, the last commit to touch
either:

- Importers, read from the tree rather than assumed. `pid-signal.ts`: `spawn-state.ts`,
  `supervisor-exec.ts`, `supervisor-child-reconcile.ts`. `pid-alive-or-refuse.ts`:
  `supervisor-spawn-oauth-proxy.ts`, `supervisor-proxy-liveness.ts`,
  `supervisor-proxy-version.ts`, `model-gateway/state-file.ts`. No file names both.
- Both `CollapseRefused` classes imported into one process: not the same object, and an
  instance from one answers false to `instanceof` against the other. Both carry the name
  `CollapseRefused`, so a printed error cannot tell them apart.
- A search over `tools/**/*.ts` for `CollapseRefused` outside the two files declaring it
  returns nothing, so nothing is presently caught by the wrong class.
- `isPidAlive` against the fold of `readPidSignal(pid)` over the same table, at five pids:
  this process, 1, 2, 2147483647, 999999. All five agree.

Not measured:

- Whether the two agree on the `unknown` reading. It needs a `process.kill` failing with
  neither ESRCH nor EPERM, and no pid here produces one. Both read as rethrowing, which is
  a reading rather than a measurement.
- Whether the duplication was deliberate. The commit adding `pid-alive-or-refuse.ts`
  (`30e3e506b`) says nothing either way, and no document naming both was found.
- The `@shared/utils-process/pid-signal` still standing in the code repository, a third
  copy this says nothing about.
- Which of the two is the one to keep.
