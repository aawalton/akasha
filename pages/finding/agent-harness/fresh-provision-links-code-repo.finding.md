---
id: 551226e6-8225-521b-8c55-e8f0552e5c4d
slug: fresh-provision-links-code-repo
page-type-slug: finding
title: "Fresh provision links code repo"
domain-slug: domain/agent-harness
---

# Claim

In agent-harness, a fresh workstation provision still builds the memory-reaper and wake-watcher systemd units from `packages/shared/dotfiles/.config/systemd/user/` in the code repository, though both daemons already run live from `tools/memory-reaper.service` and `tools/wake-watcher.service` in the instructions repo, with the `~/.config/systemd/user` symlinks already pointed there by hand.

# Evidence

Project #18941 (status awaiting_lead_definition), agent-harness. Objectives: (1) a fresh provision links memory-reaper and wake-watcher units from the instructions repo, measured on `setup-symlinks.sh` naming `$HOME/instructions/tools/<x>.service` as target; (2) no copy of either unit stands in the code repo, measured by their absence from `packages/shared/dotfiles/.config/systemd/user/`.

The replacement is already landed and live: `tools/memory-reaper.service` and `tools/wake-watcher.service` stand in the instructions repo, both symlinks in `~/.config/systemd/user` already point at them, both daemons restarted onto that route and stopped cleanly at `Result=success`. Nothing running changes; what a fresh provision would build does.

Two edits needed in `packages/shared/dotfiles/setup-symlinks.sh`: the `link` lines for these two units name `$DOTFILES/.config/systemd/user/<x>.service` as target; each becomes `$HOME/instructions/tools/<x>.service`. `link` takes target first, link path second, so only the first argument moves — not a pure deletion, since dropping the lines would leave a fresh workstation with no unit at all. Then delete the two `.service` files under `packages/shared/dotfiles/.config/systemd/user/`.

`filler-drain` is deliberately left alone, both unit file and link line: it sets `KillMode=mixed`, SIGTERMing MainPID only, so an `exec bun ops instructions <command>` route would signal `ops` and never the daemon, whose handler requeues an in-flight job before killing its render child — on that route the job would perma-fail instead of returning to the queue.

No symlink should be repointed from this project: the live links already sit correctly in `~/.config`, in neither repository. Until this lands, running `setup-symlinks.sh` would restore the old code-side targets — the whole reason this project exists — and is recoverable with one `ln -sfn`.
