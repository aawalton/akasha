---
id: 54e38492-f0b5-5a77-9ef7-d477770298c9
page-type-slug: finding
title: "The eleven checked-in systemd units govern nothing, and at least one names a command that does not exist"
domain-slug: repo/code-repo
---

# Claim

The eleven systemd units checked into the code repository under `packages/shared/dotfiles/.config/systemd/user/` no longer govern anything: the units systemd actually loads are generated into `~/.local/state/workstation-services/` and symlinked from `~/.config/systemd/user/`. Every checked-in copy still names a `bun ops` command in its `ExecStart`, and at least one of those commands does not exist.

# Evidence

`~/.config/systemd/user/inbox-tracking-poll.service` is a symlink to `~/.local/state/workstation-services/inbox-tracking-poll.service`, made 2026-08-18 20:49. So the loaded unit is generated, not either checked-in copy.

The three copies of that unit disagree. Both repositories carry the same stale line:

    ExecStart=... exec bun ops inbox-tracking poll-once

The generated one carries:

    ExecStart=... exec bun tools/services/inbox-tracking-poll.ts

`ops inbox-tracking poll-once` is not a command. `tools/commands/inbox-tracking/` declares `logs`, `run` and `status`, and the dispatcher answers the unknown command with its usage and exit 1. The service is nonetheless healthy — `systemctl --user status inbox-tracking-poll.service` shows the last run at 21:35:01 exiting 0 with `outcome=patched` — because what runs is the generated unit.

Eight unit files stand in both repositories at once: `alan-typing-drain`, `inbox-tracking-poll`, `monarch-sync` and `tracking-hourly-confirm`, each as `.service` and `.timer`. `monarch-sync.service` and `tracking-hourly-confirm.service` already differ between the two. For `alan-typing-drain`, `monarch-sync` and `tracking-hourly-confirm`, the loaded unit matches neither repository's copy.

Eleven checked-in units name `bun ops` in an `ExecStart`: `alan-typing-drain`, `inbox-tracking-poll`, `macbook-inference-probe`, `mobile-sim-suite`, `music-listening-capture`, `review-documents`, `temper-watcher`, `temper-watcher-liveness`, `tracking-hourly-confirm` (two lines) and `workstation-resource-probe`.

Each generated unit has a document under `domains/services/`, and `tools/services/` holds the scripts three of them run.
