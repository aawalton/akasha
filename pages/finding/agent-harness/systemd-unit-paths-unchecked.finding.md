---
id: 66512769-84eb-5eac-b8c3-2d3e9f5760ac
page-type-slug: finding
title: "Systemd unit paths unchecked"
domain-slug: domain/agent-harness
---

# Claim

Nothing checks that a systemd unit's `ExecStart` names paths and slugs that exist, so a unit whose prompt points at a deleted tool goes on reporting exit 0 while what it starts is a seat that cannot work. `hooks-uncopied` makes exactly this cross-repo comparison for hook scripts, and the units get none of it.

# Evidence

Found 2026-08-06 while walking the code arm of the `declared-vocabulary` initiative for `perimeter`.

`review-perimeter.service` hands its spawned archivist a prompt ending `Pin: bun ~/instructions/tools/pin.ts …`. That tool was removed from the instructions repo at `ff2202a3`. Stating its attributes is how a seat gets past `hold-seat`, so the archivist is left Read, Grep and Glob: it can read the corpus and write none of it. `journalctl --user -u review-perimeter.service` shows clean spawns on 2026-08-04 and 2026-08-05, exit 0 both nights. #18041 repairs this unit.

MEASURED, AND MY FIRST INSTRUMENT WAS WRONG. Comparing `systemctl --user cat` against each unit file reported 18 of 26 drifted — every `.service` and no `.timer`. That is the drop-in at `/usr/lib/systemd/user/service.d/10-timeout-abort.conf`, which `cat` splices into every service, rather than drift. Asking systemd itself, `systemctl --user show <unit> -p NeedDaemonReload`, gives 2 of 26: `review-perimeter.service` and its timer. The other 24 are current. So the reload gap is real as a mechanism and has bitten once, not fleet-wide.

WHAT IS NOT MEASURED. Whether any other unit's `ExecStart` names something that no longer exists — the reload check answers a different question, and no instrument here walks the paths and slugs a unit hands a seat. 26 user units are installed as symlinks into `packages/shared/dotfiles`. The system units under `sudo` were not looked at.

THE TWO HALVES COME APART. A reload fixes a unit whose file was corrected and never picked up. It does nothing for a unit whose file is itself stale against another repository, which is the half that cost the nightly pass.
