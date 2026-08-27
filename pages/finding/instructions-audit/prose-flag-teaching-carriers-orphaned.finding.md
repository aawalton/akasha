---
id: 47252b31-1905-50ab-a668-3e66f271d4cf
slug: prose-flag-teaching-carriers-orphaned
page-type-slug: finding
title: "Prose flag teaching carriers orphaned"
domain-slug: domain/global
---

# Claim

The `no-prose-flag-teaching` guard read three carriers — repo markdown, the ops registry's help screens, and instruction-bearing page rows from the database. Its check file was deleted whole with the ops registry. The help-screen carrier moved with the surface; the markdown and page-row carriers are now read by nothing.

# Evidence

`check-no-prose-flag-teaching.ts` was deleted in `6c5c288c78` on the `project-19011` branch, as one of the check files whose population was partly the ops command surface. It stands nowhere in `/var/home/walton/repos/akasha` today.

Its own docblock names what it read: "THREE CARRIERS, EVERY ONE OF THEM READ ON EVERY RUN. Repo markdown and the registry's own help screens are files in this checkout; an instruction-bearing page row carrying no `sourcePath` is authored data no repo file mirrors, so it is read from the database... a carrier this run cannot acquire ends the run at exit 2, because a zero over a corpus half of which was never opened is the false-clear this check exists to remove." The page-row carrier is `INSTRUCTIONAL_PAGE_TYPES = ["persona", "framework-doc", "gm-doctrine-pack"]`.

The same docblock records that a fourth carrier, the instructions repo, was moved out because no pipeline could reach it, and is guarded where it lives by a PreToolUse guard over the executing path. That guard stands, at `tools/lib/refuse-substituting-backtick.ts`. It judges one command as it is about to run. It does not scan markdown and it does not read page rows.

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha` and still no replacement. Its one caller is `tools/hooks/agent-hook-block-substituting-backtick.agent-hook.code.attachment.ts:5`, which names it as a per-call decider, not a corpus scanner. `tools/run-checks.ts` registers no check whose name or body mentions prose. `cli-prose-flag-route-coverage.ts` is gone too, and what survives of that shape is `tools/lib/prose-route.ts`, which settles how a prose-valued flag is routed to a `-file` form — not that no site teaches a form the shell expands. `INSTRUCTIONAL_PAGE_TYPES` appears nowhere, so nothing reads the page-row carrier at all.

What makes this worth filing: the two orphaned carriers are the ones with nothing to do with `ops`. The check straddled, and only the ops half had a replacement waiting. Nothing in the deletion's output distinguishes a carrier that moved from a carrier that stopped being read, because a deleted check reports neither.

The artifact it consumed, `prose-flags.generated.json`, went with it, so the flag list a rebuilt guard would need stands in neither repository. Reconstructing it is not a repoint.
