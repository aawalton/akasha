---
id: 1f118a7d-7ccd-5db0-9c75-9e8fe75b537c
slug: rows-owed-by-tree-18682
page-type-slug: finding
title: "Rows owed by tree 18682"
domain-slug: domain/global
---

# Claim

Tree #18682 has turned up rows that belong outside it, each confirmed by me rather than taken on a child's report. They are recorded here because a parent document holds only where the tree stands, and because a row named inside one verdict is read once and then never again by anyone deciding what to work on next.

# Evidence

**From #18734, the iOS widget mirror.**

- `docs/widget-feed-pipe.md` is cited by `packages/alanwalton/native-shell/ios-widget/ClaudeUsagePayload.swift:6` and `packages/alanwalton/native-shell/scripts/decode-harness/main.swift:1`, and exists nowhere. Absent from `git ls-files` and from a filesystem `find` over the tree, two routes. The delivering seat named `WidgetFeed.swift` and a bare `scripts/` path, both wrong; the paths above are measured. Either the document is written or the two citations go.
- `check-widget-bucket-color-mirror` is now misnamed: three of its nineteen mirrors are colour and sixteen are payload shape. A rename moves a registry name and a CI step name, so it is a row rather than a change inside somebody else's tree.

**From #18735, work-surfacing coverage.**

- `ops project summary` stays parked, correctly, over one string: `done: "done"`, the value side of a map from the model's bucket vocabulary to a published TSV column name. The curation predicate reads any quoted status spelling as a local copy of the model. Greening it means renaming a published column to suit a substring scan, or an indirection whose only purpose is dodging one — both the green-bought-by-worse-source the check exists to refuse. **The open question is whether the conjunct should admit a map total over a non-status vocabulary**, which is a change to the predicate and not to any surface it judges.
**From #18729, `check-unused-deps`.** Two dead things it left standing, both confirmed by me. `workspaceBinIndex` is built at `check-unused-deps-context.ts:251-255`, carried on the context at `:269` and declared on the type at `check-unused-deps-types.ts:40`, and read at no fourth site. And `findingsForWorkspace` at `check-unused-deps-credit.ts:113` opens with `if (ws.root === "") { }` — one comment, no statement — a branch that reads as special handling of the root and does nothing, which is a fossil of the double-count that project removed.
