---
id: 01a046c8-887b-7000-994a-ab44b550edb9
page-type-slug: finding
slug: a-mention-of-a-deleted-file-is-not-caught
title: "A mention of a file that goes is left standing, where a link to it would be caught"
domain-slug: domain/context-mention
---

# Claim

`pages/finding/person/the-account-uuid-stands-in-nineteen-files-too.finding.md:49` names `shared/pages-access/page-types-interface.md:30`, which was removed at `6e10c3ab9` on 2026-08-28. The reference is a mention rather than a link, so `links-resolve` never looked at it, and the removal landed with every check passing. A reader following it meets a path that is not there and has no way to tell whether the file moved, was renamed, or was deleted on purpose.

# Evidence

The line, verbatim:

    `shared/pages-access/page-types-interface.md:30`, where it is the marker for the DEFINITION tier

The path stands in backticks, which is a context mention — plain text a reader runs — and not a markdown link. `checks-system/check/links-resolve/links-resolve.check.md` states what that check is for: "fails a change leaving a markdown link pointing at nothing, at either end", and its Design names the three ways a link breaks. A mention is none of them, so a mention naming a file that goes is outside what it judges.

The removal that did this was mine, under the initiative closing findings against the pages system. `page-types-interface.md` was one of 13 markdown files documenting the Postgres-backed pages layer, removed together because they linked to each other and could not go one at a time. `ops rm` ran its gate over the patch — 8 checks, none refused — because the only inbound reference left anywhere was this mention.

Not established: how many other mentions across the repository name a file that is already gone. This is one instance found by having made it, not a swept population. A sweep would read every backticked path in every markdown file and ask whether it stands, which nothing does today.

Not established: whether a mention naming a file that goes should be caught at all. `context-mention` states that a mention is "a reference written as plain text, which a reader runs" — a reader running it is the whole mechanism, and a check that read every backticked span would also read the ones that are not paths. The reason for filing this rather than repairing the line is that the question is whether the class is worth catching, which is a decision rather than an edit.
