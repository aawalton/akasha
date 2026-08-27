---
id: 056c4089-c5d5-50ae-9d91-113db29c0900
page-type-slug: finding
title: "Rebase continue eats hash subject"
domain-slug: domain/global
---

# Claim

`ops project rebase --continue` invokes git on the editor path, where message cleanup defaults to `strip` and deletes every `#`-leading line. Commit subjects here begin `#<seq>`, so a conflicted commit loses its subject and the body's first paragraph becomes it, re-flowed onto one line.

# Evidence

Reported 2026-08-02 by `manage-17440` of its own #17493 rebase: the subject `#17493 feat: …` became the body's first paragraph on a single line. Its reflog isolated the rewrite to `rebase (continue)`, and every non-conflicted commit the same rebase replayed kept its subject.

The mechanism was derived here rather than taken on report, and it is narrower than "rebase drops subjects". `packages/infra/git/cli/src/lib/rebase.ts:194` runs `git -c core.editor=true rebase --continue`, its own comment naming `true` as the no-op editor so nothing opens. Passing an editor at all is what selects cleanup mode `strip`; with no editor git uses `whitespace`.

Reproduced in a throwaway repository, one message committed twice:

    --cleanup=strip       subject: [The body first paragraph, several words wrapping across lines.]
    --cleanup=whitespace  subject: [#17493 feat: the subject line]

`strip` removes comment lines, `core.commentChar` defaults to `#`, and every subject in this repository opens with one. So the subject is not mangled — it is read as a comment and deleted, and the next surviving line is promoted and re-wrapped.

That is also why only conflicted commits are hit. A commit replayed without conflict never reaches the editor path, keeps `whitespace`, and keeps its subject — which is what makes the defect look like chance rather than a rule.

It recurs on every conflicted commit, the `#<seq>` convention being universal here, and a subject replaced by re-flowed body prose still reads as one somebody wrote.

Not applied: `-c core.commentChar=auto` makes git pick a character the message does not contain, and it writes its instructional comments and strips them with that same one, so the two cannot disagree. A fixed alternative such as `;` moves the hazard rather than removing it.

Not measured: how many commits already on `main` carry a subject lost this way.
