---
id: 89a937d5-68ce-55cc-b2e5-959cd472a100
slug: systemd-unit-constraints-from-deleted-comments
page-type-slug: finding
title: "Systemd unit constraints from deleted comments"
domain-slug: domain/global
---

# Claim

Four operational constraints on this workstation's systemd units stood only in the unit comments that #19290 deleted, and each was learned by something breaking.

# Evidence

Recorded on 2026-08-16 by #19290, which deleted 884 comments from 54 files including 28 systemd units under `packages/shared/dotfiles`.

Deleting was right and is not in question: the domain's rule is delete wholesale, and nothing re-read these headers or held them against the units below. But four of them carried constraints a future editor would otherwise rediscover only by breaking something, so they are recorded here rather than lost.

- **`sigterm-attribution.service`** — SELinux denies systemd's `init_t` the `execute` permission on a `user_home_t` file, so a *system* unit cannot run a script out of `/home`; the attempt fails with `status=203/EXEC`. This is why the reader is copied into `/usr/local/bin` rather than symlinked into `~/code`.
- **Repeated across most units** — systemd's `EnvironmentFile=` cannot parse `~/.secrets.env`, whose lines are `export KEY=value`. That is why those units wrap their command in `bash -c 'set -a; . …'`. Separately, `.bashrc` returns early for the non-interactive shell systemd spawns, so `PATH` has to be set explicitly rather than inherited.
- **`monarch-sync.service`** — its non-default `TimeoutStartSec=120` rests on a measurement: 37 seconds for 31 accounts and 3,057 transactions. The measurement is the whole justification for the value, and without it the number reads as arbitrary and invites tightening.
- **`dcgm-exporter.service`** — the SELinux boolean `container_use_devices` must be on for the RTX 5080.

Each is a constraint imposed from outside by SELinux, systemd or a measurement, rather than a preference. Git holds the original text at `89df59b1^`.

No claim is made here about where these should live. Whether any becomes a line on a domain is a judgment for whoever holds this area.
