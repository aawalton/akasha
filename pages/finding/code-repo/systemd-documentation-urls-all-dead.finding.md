---
id: 3cf83b28-f5d7-5df6-9d95-f9bfc79e8066
page-type-slug: finding
title: "Systemd documentation urls all dead"
domain-slug: repo/code-repo
---

# Claim

Every systemd `--user` unit in the workstation IaC points an operator at a document that no longer exists. All 16 units under `packages/shared/dotfiles/.config/systemd/user/` carry a `Documentation=` git-forge URL into the code repo, and all 16 resolve to nothing — 12 distinct paths, every one lifted into instructions-repo quarantine. Two live checks already walk exactly this population and neither reads the field.

# Evidence

Measured 2026-08-07 in `~/code` while emptying `dirty/code/packages-agents-shared-docs-filler-queue.md`, whose old path is one of the targets.

`grep -rn "Documentation=" packages/shared/dotfiles/.config/systemd/user/*.service` returns 16 lines, one per unit. Resolving each URL's repo-relative tail against the working tree returns GONE for all 16 and LIVE for none. The 12 distinct targets split six package `CLAUDE.md` files to six `docs/*.md`; `packages/shared/dotfiles/CLAUDE.md` is cited by three units.

Two checks walk this directory and both are silent here. `check-systemd-unit-wiring.ts` enforces that every unit is symlinked by `setup-symlinks.sh` and declared in `units-enabled.txt`; `grep -n "Documentation"` over it returns nothing. `check-supervisor-daemon-claude-path.ts` reads unit files line by line, but only for `Environment=PATH` including `%h/.local/bin`. The population is instrumented and the parse is already written; this one directive is unexamined.

Nothing else reaches it. The value is an absolute `https://git.alanwalton.com/...` URL rather than a repo path, so a sweep for path-shaped strings misses it; it sits in a `.service` file, so a docblock sweep and a markdown link checker both skip the carrier; and the `[mentions]` gate that ran when the filler-queue document was removed scans the instructions repo, not `~/code`, and reported 0 stranded while this URL stood.

The field surfaces through `systemctl --user status <unit>` and `systemctl show -p Documentation`.

Two standing findings record the same rot in other carriers: `pages/finding/infra/check-docblocks-cite-quarantine.finding.md` (three TypeScript docblocks) and `pages/finding/alanwalton-app/reward-reminder-cites-quarantined-doc.finding.md` (a runtime notification string). Both are prose. This is service metadata, and it is dead at every site rather than a few.

Not established: whether the URLs 404 or serve a stale cached blob — not probed, fetching them being a request to a service off this host. Nor whether `Documentation=` was meant to survive the sweep.
