---
id: 68dacf99-fc6b-5499-9e41-2fe1d7c9551c
slug: editor-boot-return-unobserved
page-type-slug: finding
title: "Editor boot return unobserved"
domain-slug: domain/code-editor
---

# Claim

Whether Alan's cut of VS Code returns after a reboot has never been observed: the workstation has not restarted since 2026-07-26, so nothing has exercised the user manager pulling the unit at boot.

# Evidence

#17747 delivered the cut as a systemd user unit on host node, running as Alan, reachable at `http://127.0.0.1:9888/`. Five of its six criteria were met and lead-verified with instruments run rather than read: `gate.sh` 7/7 exit 0, the served page advertising `folderUri` `/home/walton/code`, `ss` showing the listener bound to `127.0.0.1`, a shell carrying the unit's environment resolving `ops`, and a second instance served under `env -i` with every graphical variable withheld coming back 200 with the monorepo legible.

`Linger=yes` and the wants-symlink are both in place, so every link in the boot chain is established in the deployed source. What no check can show is the manager acting on them, because the machine has not restarted since 2026-07-26. Alan closed the row on 2026-08-05 accepting the criterion on the source rather than holding the row for a restart.

Two things are unobserved together, and the second is the one worth catching. The first is simply whether it comes back. The second is a property the cold-environment test surfaced during that row: a boot-started service keeps its boot environment for life, and a later graphical login does not enter it. So editor terminals will have no `SSH_AUTH_SOCK` and no `DISPLAY` after a reboot, though they carry both today, because today's instance was started from a graphical session. Git here is HTTP, so pushes are unaffected; the exposure is ad-hoc ssh and GUI launches from an editor terminal.

That second one presents as a broken editor rather than as a missing variable, and it will present on the first restart rather than on the tenth. So the reading to take at the next reboot is two acts rather than one: open the URL with nothing typed first, and then run `echo $SSH_AUTH_SOCK` in an editor terminal.
