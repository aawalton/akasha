---
id: 24e3762c-60a2-53b7-83ce-9569130c1c60
page-type-slug: finding
title: "Daemon unit Claude path unguarded"
domain-slug: domain/agent-harness
---

# Claim

No check in either repository now holds the three fleet daemon units to carrying `%h/.local/bin` on their `Environment=PATH`, which is what a revived supervisor needs to exec `claude`.

# Evidence

`check-supervisor-daemon-claude-path` in the code repository judges every systemd `--user` unit under `packages/shared/dotfiles/.config/systemd/user` whose `ExecStart` can reach a claude exec, and requires `%h/.local/bin` on its PATH. It exists because of a case that already happened: the wake-watcher revived a supervisor that then exec'd `claude`, the unit's PATH omitted the directory the `claude` shim sits in, the revive died with ENOENT, and the daemon silently never recovered.

Under #19155 the wake-watcher, memory-reaper and filler-drain units moved to `tools/*.service` in the instructions repository, which is what those daemons now run from. That took them out of the directory the check walks, so it no longer judges them. The check still passes and still judges the units that remain, so nothing reports the three that left.

All three carry `%h/.local/bin` today: wake-watcher and filler-drain state it, and memory-reaper reaches no claude exec and never carried it. What is absent is anything that would notice a later edit dropping it.

The instructions repository is where a check on the harness belongs, and it has the machinery for one — `tools/checks/`, registration in `tools/run-checks.ts`, and refusal documents under `refusals/`. Writing that check was not done inside #19155.
