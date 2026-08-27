---
id: 47252b31-1905-50ab-a668-3e66f271d4cf
slug: prose-flag-teaching-carriers-orphaned
page-type-slug: finding
title: "Prose flag teaching carriers orphaned"
domain-slug: domain/global
---

# Claim

The `no-prose-flag-teaching` guard read three carriers — code-repo markdown, the ops registry's help screens, and instruction-bearing page rows from the database. Its check file was deleted whole with the ops registry. The help-screen carrier moved to the instructions repo with the surface; the markdown and page-row carriers are now read by nothing.

# Evidence

`packages/infra/checks/src/checks/check-no-prose-flag-teaching.ts` was deleted in `6c5c288c78` on the `project-19011` branch, as one of the check files whose population was partly the ops command surface.

Its own docblock names what it read: "THREE CARRIERS, EVERY ONE OF THEM READ ON EVERY RUN. Repo markdown and the registry's own help screens are files in this checkout; an instruction-bearing page row carrying no `sourcePath` is authored data no repo file mirrors, so it is read from the database... a carrier this run cannot acquire ends the run at exit 2, because a zero over a corpus half of which was never opened is the false-clear this check exists to remove." The page-row carrier is `INSTRUCTIONAL_PAGE_TYPES = ["persona", "framework-doc", "gm-doctrine-pack"]`.

The same docblock records that a fourth carrier, the instructions repo, was moved out because no pipeline could reach it, and is guarded where it lives by a PreToolUse guard over the executing path. That guard stands, at `tools/lib/refuse-substituting-backtick.ts`. It judges one command as it is about to run. It does not scan markdown and it does not read page rows.

Searched the instructions repository and found no replacement: nothing under `tools/` contains `teach`, and nothing imports `refuse-substituting-backtick` as a corpus scanner. `tools/checks/cli-prose-flag-route-coverage.ts` claims a flag taught in prose has a declared route, not that no site teaches a form the shell expands.

What makes this worth filing: the two orphaned carriers are the ones with nothing to do with `ops`. The check straddled, and only the ops half had a replacement waiting. Nothing in the deletion's output distinguishes a carrier that moved from a carrier that stopped being read, because a deleted check reports neither.

The artifact it consumed, `prose-flags.generated.json`, went with it, so the flag list a rebuilt guard would need stands in neither repository. Reconstructing it is not a repoint.
