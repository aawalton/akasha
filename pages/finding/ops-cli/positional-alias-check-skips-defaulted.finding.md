---
id: 72133794-d02a-573a-a4d6-10dadac850f0
slug: positional-alias-check-skips-defaulted
page-type-slug: finding
title: "The positional-alias check reads only required flags, so every subject that defaults to the caller stands outside it"
domain-slug: domain/ops-cli
---

# Claim

The check that requires a subject-identifier flag to offer a positional alias
reads only flags declared `required: true`. A flag that names the command's
subject but carries a default is never examined, so the whole class of
commands that default their subject to the caller stands outside the check.

Across the 430-verb surface, 30 verbs declare a subject-identifier flag with
no positional alias and are not reported. They span 20 namespaces, so the gap
is not one namespace's habit.

# Evidence

`tools/audits/positionals-cover-identifiers.ts` builds its shapes through
`requiredValueFlags`, whose first line is `if (flag.required !== true) continue`.

Re-running `findPositionalAliasViolations` over the same surface with that
filter removed names 30 verbs, including `ask-alan`, `email messages send`,
`project check`, `pipeline cancel-step` and `tower turn`. The audit passes
today at exit 0.

NOT MEASURED: whether a positional is wanted on each of the 30. Some may be
deliberate — `email drafts create --to` plausibly reads better as a flag — so
the count is the size of the unexamined set, not a count of defects. Nothing
was measured about why the filter was written, and it may have been narrowed
deliberately to keep the check quiet while a backlog was worked.
