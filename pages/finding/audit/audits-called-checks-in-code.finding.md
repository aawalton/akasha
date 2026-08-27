---
id: 31007028-fec7-55fd-a0e2-7319a80a7269
page-type-slug: finding
title: "The corpus calls the 41 files audits and the code calls them checks"
domain-slug: domain/audit
---

# Claim

The corpus calls the same 41 files audits and the code calls them checks. `domains/audit.md` claims `tools/audits/*.ts` and governs them; `tools/run-checks.ts` registers the same 41 as `CHECKS`, types them `Check`, and the command is `ops instructions run-checks`. `domains/check.md` declares no `instructions-path` at all.

# Evidence

Read off the `review-instructions` reading of `domains/audit.md` finished 2026-08-21, read line by line, bottom to top. That reading listed what the glob matches before judging it — `tools/audits/*.ts` is 41 files, exactly the 41 entries `tools/run-checks.ts` registers, catching no test file — and ran `ops instructions governs --path tools/audits/links-resolve.ts`, which names the document.

The reading reached this as a whole-document call, no single line being wrong on its own, and landed nothing: Ubiquitous Naming asks one name across code, data, interface and prose, and landing it means renaming a directory, a runner and a command at once.

Not measured here: I did not run the governs call or count the registrations myself, and I did not look for a third spelling elsewhere in the corpus.
