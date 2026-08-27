---
id: 341162ad-5916-56af-88ae-70c06e32e723
page-type-slug: finding
title: "Commit help misplaces the quality checks"
domain-slug: domain/code-quality
---

# Claim

`ops project commit --help` says quality checks "are not run here — they run at `deployment`". The build documents run them one stage earlier, at `checks`, and the documents are right. The help text is stale. A seat trusting it would defer typecheck, lint and package checks past the stage the corpus places them at, and only find out at deploy.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-singleton-deploy.md` on 2026-08-07, found while checking that document rather than in it. Nobody on that reading owned the repair: it is a string in the code repo.

Verified myself: `ops project commit --help` ends "Quality checks (typecheck, lint, package checks) are not run here — they run at `deployment`."

This is the second stale help string this run, after `code-quality/lint-verdict-help-misstates-its-default`. Both were found the same way — a reading checking a document claim against the command, and concluding the document was right.
