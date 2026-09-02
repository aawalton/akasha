---
id: babd2e54-d1d2-52bf-b963-7340fd354393
page-type-slug: old-ops-command
title: "Ops rm"
slug: ops-rm
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/global/rm/rm.command.code.attachment.ts
path: rm
irreversible: true
---

# Definition

- **Ops rm** — named paths taken away, gated together and removed or refused as one.

# Help

Remove files, gated against the repo that would remain.

SEVERAL PATHS IS THE SHAPE, not a convenience: two documents naming each other cannot be removed one at a time in any order, so one call naming both is the only removal there is. A path that is not there is REFUSED rather than treated as already-done, a removal carrying no body to cross-check the path against.

A PAGE'S OWN FILES GO WITH IT: an attachment, a rows file and its parts, an uncommitted file or a sops file standing beside a named page. A DIRECTORY TAKES EVERY TRACKED FILE UNDER IT, and one git holds no file under is refused. Everything taken without your naming it is reported before anything goes and named in the commit, and a directory the removal leaves empty goes too, git holding no empty directory.

A call addressing akasha is turned into a patch against HEAD and the checks akasha defines are run over it before anything leaves disk: a relation on a surviving file still naming a page that would be gone refuses the call, and so does a module a survivor still imports. A call addressing any other repository is taken unjudged, those repositories having no checks. A path inside no repository is removed where it lies, with nothing committing it. A removal is decided by a program rather than authored, so the checks weighing what its writer read stand aside.

THIS IS NOT rename or move, and `ops mv` is: it carries the body to its new path, repoints every referrer that named it, and removes the path moved out of, in ONE commit. Reach for it rather than removing a file and writing it back elsewhere, which drops the inbound links and the history together.
