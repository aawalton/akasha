---
id: d61041e0-9556-5533-8f80-117f8f9f334d
slug: extension-sources-untested
page-type-slug: finding
title: "Extension sources untested"
domain-slug: domain/code-editor
---

# Claim

Fifteen of the twenty-five source files in the ops extension carry no test, and the agent tree is among them. The extension's source now stands in akasha at `editor-extension/src`, `code-editor/extensions/ops` being a symlink to it.

# Evidence

Measured 2026-08-12 over `/var/home/walton/code-editor/extensions/ops/src` by pairing each `*.ts` with a sibling `*.unit.test.ts`: 25 sources, 11 tests, 15 sources with no sibling.

The same pairing re-run on 2026-08-27 over `editor-extension/src` in akasha, on `main`: 70 sources, 43 with no sibling. `editor-extension/src/features/agent-tree/tree.ts` still has none.

The untested ones on the 2026-08-12 reading were `extension.ts`, `supabase/secrets.ts`, the whole of `features/transcript` (activate, panel, render, sources), the whole of `features/agent-tree` (activate, tree, columns, subagents), `features/terminal-rename/activate.ts`, and `features/status-bar`'s `activate.ts`, `readers.ts`, `slot-types.ts` and `theme.ts`. Of those `features/status-bar/readers.ts` no longer stands; the rest of `features/status-bar` — `activate.ts`, `slot-types.ts`, `theme.ts` — and `features/agent-tree/tree.ts`, `columns.ts`, `activate.ts` and `subagents.ts` still carry no sibling test.

This is not a port that dropped anything. #18918 carried every test the code repository held for these files — all eleven — and wired them into `precommit`, where they now fire on every commit touching the extension. The gap is inherited: those fifteen files never had tests on either side.

What makes it worth recording rather than accepting is what changed around it. These files now ship on a commit with no deploy and no review, and Alan is changing them at conversational speed — on 2026-08-12 alone the extension took the state-circle removal, and the agent tree took an expand-all and is queued for a hover-to-right-click change. `features/agent-tree/tree.ts` is the file those requests land in and it has no test at all, so the thing standing between a bad edit and a surface Alan finds himself is his own eyes on the next reload.
