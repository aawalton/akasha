---
page-type-slug: finding
title: "A check can fail on a line it never prints"
domain-slug: domain/checks-system
---

# Claim

A check's verdict is decided by one list of lines and its output prints another, and nothing holds the two together. `judge` at `outcome/outcome.ts:29` takes its verdict from the list handed to it, and `render` at `outcome/outcome.ts:55` prints `Outcome.messages`. A check that spreads `judge`'s result and then replaces `messages` has separated them, and from that point a line can decide a failure without ever being printed: the check answers `fail` under a summary whose every count reads clean, with nothing under it saying why.

# Evidence

Measured 2026-08-28.

`tools/audits/relations-resolve.ts` held the shape. `judge` was handed `[...clean, ...(bearers.missed.size === 0 ? [] : unread(bearers.missed))]` and the returned outcome carried `messages: [...clean, ...quarantined]`. The `unread` line — the one naming every page whose frontmatter would not parse, and so the one saying that no relation under that sweep is certified — decided the verdict and was in neither the printed list nor any count in the summary.

Positive control, in a temp root: three page types, one relation `team-slug` from `person` to `team`, one person whose team stands, and one team page carrying a stray indent in its frontmatter so `blockOf` at `page/text/text.ts:30` answers an error while `fm.present` stays true. The sweep in `page/relation/relation.ts:165-168` walks every team page looking for the value, reaches the unreadable one first, and records it. Against the code as it stood the check answered:

    verdict : fail
    detail  : 1 of 1 relations resolve across 1 page(s) of 3 page type(s) — 0 unresolved among the live pages, 0 under quarantine
    printed : 0 line(s)

A failure, three counts all reading clean, and not one line. Against the repaired code the same fixture names the page. The control was run both ways rather than once; a count moving would not have shown this, because no count moved.

Repaired at `a9a47cb512151474eac6886b029673a5701dfed8`: the refusing list is built once, is a prefix of the shown list, and the summary carries a third count for the pages that could not be read.

Population: 26 of the 33 modules under `tools/audits/` call `judge`, and 2 of those 26 replace `messages` afterwards. The other is `tools/audits/links-resolve.ts`, which is safe — its judged list is a prefix of its shown list and its summary names both counts — but safe by the order the two arrays happen to be written in, not by anything that holds them so. The checks under `checks-system/check/` cannot take this shape: a `Check` there returns `readonly CheckFailure[]` and never composes an `Outcome`.

Not measured: whether any check outside `tools/audits/` composes an `Outcome` by hand and could take the shape that way.
