---
id: 43c14737-ac50-5d23-ba3d-4652e4ac9aad
slug: schema-doc-fossil-refs
page-type-slug: finding
title: "Schema doc fossil refs"
domain-slug: domain/temper
---

# Claim

The Temper skill reference `tech-data-database/schema-and-tables.md` is a fossil: it presents the decommissioned relational schema as current, and its source-tree listing at line 73 names `hooks-players.ts`, a file that does not exist in the repo.

# Evidence

Source: project #16034 (domain `temper`, parent #15952 "Temper — completion sharing is non-functional by construction..."), owner ember, tag `author:ember`, created 2026-07-25. No objective was written; this is the full capture.

Found during work on #15952. The file `tech-data-database/schema-and-tables.md` is already partially corrected: the `temper_user` row is labelled Retired and the `check_completion_visibility()` fossil is called out. But the body still presents the decommissioned relational schema as current, and the source-tree listing at line 73 names `hooks-players.ts`, which does not exist in the repo.

Verified: `find . -name hooks-players.ts -not -path '*/node_modules/*'` returns empty. Control check: `hooks-settings.ts` was found, confirming the search itself works.

Undecided at capture: whether to delete the fossil reference outright or rewrite it against pages + Electric. This was explicitly out of scope for #15952, which only corrected the one sentence whose subject it removed.
