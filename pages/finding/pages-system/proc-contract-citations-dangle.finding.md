---
id: 9dcf52bf-6421-58a6-8d55-0d5b43505d85
page-type-slug: finding
title: "Proc contract citations dangle"
domain-slug: domain/pages-system
---

# Claim

Twelve live modules under `packages/shared/pages/` open with `// Contract (packages/shared/pages/proc/CLAUDE.md → "<heading>")`, and that path holds no file. Eleven name a heading it never had — "Unique-key composition", "Status / completed-at composition", "Parent-key composition", "Rematerialize skip-gate" — which stood in its `docs/composed-columns.md`, now equally empty. Six are production `_compose_*.ts` modules, so the contract each declares itself accountable to is unreachable.

# Evidence

Read in `~/code` on `main` at `1313565199`, on 2026-08-07.

`grep -rn "proc/CLAUDE.md" --include="*.ts"`, excluding `node_modules`, returns exactly twelve hits. Six production modules under `pages/proc/src/`: `_compose_completed_at.ts:14`, `_compose_favorited_at.ts:16`, `_compose_last_viewed_at.ts:22`, `_compose_parent_key.ts:15`, `_compose_status.ts:15`, `_compose_unique_key.ts:15`. Six tests under `pages/proc-compiler/src/`: `_compose_unique_key.equiv`, `page-create.unique-key.equiv`, `pages-bulk-upsert.unique-key.equiv`, `pages-bulk-upsert.content-storage-guard.equiv`, `page-patch-by-id.unique-key.equiv`, `_composed_column_signature.equiv`, each `.database.test.ts`.

Two defects, one older than the other.

The anchors were wrong before anything moved. The document is quarantined in the instructions repo at `dirty/code/packages-shared-pages-proc-claude.md`; it carries sixteen `##` headings and none of the four is among them. All four are headings of `dirty/code/packages-shared-pages-proc-docs-composed-columns.md`, a sibling. Eleven of the twelve therefore named a real file and nothing inside it. The twelfth, the content-storage-guard test, names "Content storage routing + size guard", which the head document does have.

The path went dead afterwards. `ls packages/shared/pages/proc/` gives `bunfig.toml dist package.json src tsconfig.json tsconfig.tsbuildinfo` — no `CLAUDE.md`, no `docs/` — and `find . -name composed-columns.md` returns nothing. All twelve now dangle on the path too, including the one whose anchor was sound.

Nothing detects either half. `packages/infra/checks/src/lib/remediation-doc.ts` constrains the pointer a failing check emits, a different surface; nothing walks source comments for a cited path or anchor. All twelve compile and pass.

Not judged: whether the repair is repointing the comments or dropping the citation form.
