---
id: 87b133b8-77ad-54af-86fb-3821c2ca6c7e
page-type-slug: finding
title: "File row split is not the estate"
domain-slug: barred-meaning/project
---

# Claim

`project`'s Design line says the file holds the prose and the row holds the facts. As a census of the estate it is wrong in both directions: the row carries markdown prose and the file's frontmatter carries facts.

# Evidence

`domains/project.md` Design: "A project has a file and a row. The file holds the prose; the row holds the facts."

The row carries prose. `ops project show 17595 --properties notes` returns ten lines of narrative, and `ops project show --help` names `ruling`, `planning` and `alanAsk` beside it.

The file carries facts. `tools/document/schemas/project.ts` declares three frontmatter keys: `live-on` at line 22 (enum `deploy` | `commit`), `parent` at line 30, `domain` at line 32.

What stopped the reading from repairing it: `ops project ask --help` states the same split in almost the same words and enforces it, and commit `4e7036fa` landed this exact wording one commit before the reading, on that reasoning.

So the line is either a standing decision the estate has not caught up to, or a split that was never whole. Nothing the reading ran settles which.

Raised by the `review-instructions` reading of `domains/project.md` on 2026-08-05, which kept all nine slices: the document had been walked line by line the same day across four commits, and this pass corroborated those calls against the machinery rather than overturning them.
