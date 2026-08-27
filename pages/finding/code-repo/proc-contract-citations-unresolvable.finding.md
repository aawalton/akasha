---
id: ca9235d0-196a-5024-a82e-194b8c9cc3ac
page-type-slug: finding
title: "Proc contract citations unresolvable"
domain-slug: repo/code-repo
---

# Claim

Twelve source and test files under `packages/shared/pages/` carry contract
citations to `packages/shared/pages/proc/CLAUDE.md`, a document that is no longer
in the code repository, and each names a section heading that document never
carried even when it stood.

# Evidence

`grep -rn "packages/shared/pages/proc/CLAUDE.md" ~/code` returns twelve hits in
twelve files: six under `packages/shared/pages/proc/src/`
(`_compose_completed_at.ts`, `_compose_favorited_at.ts`,
`_compose_last_viewed_at.ts`, `_compose_parent_key.ts`, `_compose_status.ts`,
`_compose_unique_key.ts`) and six `*.equiv.database.test.ts` files under
`packages/shared/pages/proc-compiler/src/`.

The citations are heading-qualified comments. `_compose_unique_key.ts:15` reads
`// Contract (packages/shared/pages/proc/CLAUDE.md → "Unique-key composition",`.

`packages/shared/pages/proc/CLAUDE.md` does not exist in `~/code`. It stands
under quarantine in the instructions repo as
`dirty/code/packages-shared-pages-proc-claude.md`.

Read from that quarantined copy, its headings are `# @shared/pages-proc` and
sixteen level-two headings: Why this exists, The PageProcCtx boundary, Key files,
Commands, Conventions, Required-property enforcement, Composed columns, Content
storage routing + size guard, Schema validation gate, Declared-key write
boundary, View-time aggregate resolution, Per-page-type seq allocation, Bulk
upsert no-op suppression, Event emission, Undeclared-attributes audit, Docs.
"Unique-key composition" is not among them, so the heading half of the citation
was already false before the file moved.

`packages/shared/pages/proc/docs/` does not exist in `~/code` either.

NOT MEASURED. Whether the head documents' move to quarantine is permanent, and so
whether the repair is repointing the citations, removing them, or restoring a
document. Whether any checker covers comment-borne citations in `.ts` files.
Whether the contracts the six `*.equiv.database.test.ts` files pin to those
section names are stated anywhere a reader can now reach.
