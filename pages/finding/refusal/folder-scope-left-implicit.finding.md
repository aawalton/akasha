---
id: 7554baa0-49ac-5c50-96b9-5f621ef8030c
slug: folder-scope-left-implicit
page-type-slug: finding
title: "Folder scope left implicit"
domain-slug: page-type/refusal
---

# Claim

Neither `refusals/email-rule-match-unreadable.md` nor `refusals/category-rule-match-unreadable.md` names the folder it is talking about, and on the email side the whole folder is what stops. `{rule}` is a path to one file, so a reader infers the scope rather than being told it. Both printers already hold `ruleSet.folder` at the call site, so a `folder` hole is one argument each.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-8-review-instructions`, reading `refusals/email-rule-match-unreadable.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-8-review-instructions/review-email-rule-match-unreadable.md`.

The scope matters because that seat measured it: calling the two email checks against a synthetic root of 3 rules with 1 unreadable returned a measured population of 0 — not one rule unexamined but nothing examined. On the live corpus that is 102 rules and 20,448 messages going undecided on one bad line. It repaired the document to say so.

The same seat established that the two refusals differ correctly on scope, and withdrew a queued repair on the category one after grounding it: there the skip sits inside the per-rule loop, so only the unreadable rule is passed over, while the email skip sits in the outer loop over rule sets.

It did not add the hole, calling it a change to the instrument rather than to the document it was given.

I did not run either check or read either printer.

Not measured: whether any other refusal understates or leaves implicit the scope of what its fault stops.
