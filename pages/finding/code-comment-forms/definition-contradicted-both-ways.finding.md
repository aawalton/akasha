---
id: 30569ac6-c2df-5148-bf04-dbf8e6f1c5b4
page-type-slug: finding
title: "Definition contradicted both ways"
domain-slug: list/code-comment-forms
---

# Claim

The Definition on `domains/lists/code-comment-forms.md` — "the shapes of comment a program parses" — is contradicted in both directions. The `eslint suppression` form admits 36 comments no program on this workstation parses: eslint is not installed, appears in no `package.json`, and has no config anywhere. In the other direction, a section-divider comment that `tools/checks/schemas-bind.ts` does parse is not a form, so it classifies as prose and is deleted.

# Evidence

Raised by the reviewer seat `claude-code-comment-forms-archivist-review-instructions`, reading the document line by line on 2026-08-13. Its report is at `~/agents/claude-code-comment-forms-archivist-review-instructions/review-code-comment-forms.md`.

That seat kept `eslint suppression` rather than cutting it, on a ground it measured: the list became gate-backed while it worked (`ccbb12763` landed `tools/gates/comment-forms.ts`), so cutting the form would make every subsequent write to those 36 code-repo files refuse. That is a cost of removal, not an argument that the form belongs.

I verified the divider half myself: `bun tools/run-checks.ts --check schemas-bind` fails on both repos, and neither divider phrase is present in `tools/document/types.ts`.

Not measured: the eslint half. I did not search for an eslint install, a config, or the 36 comments, and did not re-run the seat's classification over the 17,497 governed files. Whether the 36 are load-bearing for anything other than eslint was not established.
