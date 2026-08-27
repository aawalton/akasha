---
id: 49000dcd-2dde-54f7-b571-58032a8f1fd9
page-type-slug: finding
title: "Docs oversized help overstates exemptions"
domain-slug: repo/code-repo
---

# Claim

`ops docs oversized --help` promises its exemptions match the CI file-length check exactly and names authored-story content among them, which `isFileLengthExempt` does not implement.

# Evidence

Read at `~/code` on 2026-08-07, while emptying a quarantined document about the markdown line cap.

`packages/infra/workspace/cli/src/docs/oversized.ts:20` states in the command's own help: "Exemptions match the CI file-length check exactly (allowlist, exempt dirs like `generated`/`__fixtures__`, and authored-story content), so an exempt file never appears here."

The check it claims to match is `isFileLengthExempt` in `packages/infra/checks/src/lib/file-length-core.ts`. It carries exactly five arms: a `CHECK_EXEMPT_DIRS` path-segment filter, `-data.ts`, `.generated.ts`, `.spec.ts` under `/src/pure/`, and the explicit allowlist. There is no authored-story arm, and `CHECK_EXEMPT_DIRS` is `new Set(["__fixtures__", "generated"])`. The first two items in the help text are right; the third names an exemption that exists nowhere.

`docs/oversized.ts` does no filtering of its own to make up the difference — `authored` and `stories` appear nowhere else in the file.

Nothing bites today: `packages/stories/authored/` does not exist, `packages/stories/` holds `cli`, `engine`, `narration` and `text`, and there is no `.md` file anywhere under it. That is what makes this cheap to leave and worth writing down — the claim is false now and would become load-bearing the moment authored story prose lands, at which point a long file would be reported oversized by a scanner whose help says it would not be.

The word doing the damage is "exactly". A reader checking whether their file is exempt is told the two lists agree, so they read one and not the other.
