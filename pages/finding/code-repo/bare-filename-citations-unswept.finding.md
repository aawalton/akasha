---
id: 5913c978-29e5-53ca-81c7-e4481445675b
page-type-slug: finding
title: "Bare filename citations unswept"
domain-slug: repo/code-repo
---

# Claim

Every standing measurement of the code repository's dangling markdown-pointer perimeter matches on a `docs/` path prefix, and 30 citations across 25 tracked files name a document by BARE FILENAME instead. Seventeen of the twenty distinct names they cite resolve to no live file in any of the five repositories, so a repair driven by any standing finding completes, reads as complete, and reaches none of them.

# Evidence

Measured 2026-08-08 in `~/code` while emptying `dirty/code/packages-alanwalton-native-shell-docs-widgetkit-widgets.md`, whose name one carrier cites.

Both standing perimeter findings key on the prefix: `code-repo/quarantined-doc-references-dangle.md` greps `See docs/`, and `code-repo/docs-pointer-sweep-stops-at-typescript.md` widens the FILE KIND but keeps the pattern `docs/[a-z0-9-]+\.md`. Neither matches a citation with no `docs/` in it.

    rg -n '`[a-z0-9][a-z0-9-]+\.md`' packages/ -g '*.ts' -g '*.tsx' -g '*.swift' -o | rg -v 'docs/'

returns 30 lines over 25 files, naming 20 distinct documents. Each was resolved with `git ls-files "*/<name>.md" "<name>.md"` in all five repositories — `~/code`, `~/instructions` less `dirty/`, `~/memory`, `~/books`, `~/stories`. Three resolve: `profile.md` (271 in `~/books`) and `recovery-rates.md` (one), both cited from `packages/books/book-of-everything/`; and `alan.md`, live at `domains/persons/alan.md`, whose one citer asserts its ABSENCE from another corpus rather than routing to it.

The seventeen resolving nowhere: `liveness`, `findings`, `sophia-corpus-map`, `page-comms`, `exit-forensics`, `sim-driving`, `widgetkit-widgets`, `project-dependency-graph`, `project-lifecycle`, `guard-reach`, `merge-queue-design`, `ci-workflow-dependency-graph`, `formula-language`, `inventory-buy-rules`, `temper-task-schema`, `notes`, `readme`. Most stand under `dirty/`, which is quarantine and is being emptied.

WHAT THE BARE FORM ADDS. A `See docs/x.md` offers a route, and a reader who follows it learns it is gone. Two of these ATTRIBUTE A CLAIM instead, so the sentence keeps reading as sourced. `ios-widget/ProjectCountsWidget.swift:26` — "`widgetkit-widgets.md` records that this widget already changed family once". `infra/checks/src/lib/guard-reach.ts:17` — "`guard-reach.md` names the specimen." The first was measured while its target was being removed line by line.

Not probed: whether any carrier is walked by a tool rather than read.
