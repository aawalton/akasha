---
page-type-slug: finding
id: 7997ae0d-8641-535f-98a0-63bc5841275f
title: "No panel's watcher has been seen firing in a running editor; every re-read claim rests on reading"
domain-slug: domain/code-editor-panel
---

# Claim

No panel's file watcher has been observed firing inside a running editor. Every claim that a panel re-reads or repaints on a write rests on the watcher's glob matching the path and on the handler being registered, both read rather than run.

The failure mode this leaves open is the one already met once: a watcher whose glob matches nothing does not fail, it goes quiet, and a panel that re-reads only on its button looks like a panel with nothing to re-read.

# Evidence

Raised verifying #19442 on 2026-08-22, and filed against the panel domain rather than that project because it covers all three surfaces, not the one that project changed.

What was settled without a workbench, by instruments run from this seat:

- The repaired corpus glob was matched in VS Code's own compiled engine at `code-editor/out/vs/base/common/glob.js`. The old `{themes,initiatives,projects}/**/*.md` matches none of the live page directories; the new one matches `pages/theme`, `pages/initiative` and `pages/project`, still matches the legacy folders, and excludes findings, seat pages and messages. So the brace-with-a-slash parses as intended, which was the risk.
- `ops memory project-tree --colours` answers in 324 ms against the whole tree's 316 ms, reading seat pages and their sidecars and opening no corpus document.
- The two new test files pass run directly from this seat: 5 in `instructions`, 25 in `code-editor`.

What none of that settles: that a write to a seat sidecar reaches the panel. That needs the workbench running the changed code, and the change is committed to `code-editor` rather than promoted — only `tools/promote.sh` writes the checkout Alan runs, and a promoted change reaches his window only when he reloads it. So the observation waits on an act outside this seat.

The Agents panel and the tab strip carry the same unobserved claim and have carried it since they were built. Both are believed live on the strength of Alan seeing colours move, which is observation of a sort but is not recorded anywhere and did not distinguish the two watchers from each other.

Not measured: whether a probe could settle this without a full workbench — whether VS Code's file watcher can be exercised in a test harness in this fork, and at what cost. Nothing here has looked.
