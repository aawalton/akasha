---
id: f99e44db-bca7-55a2-889e-8f590a4bc07d
page-type-slug: finding
title: "Splitting a test file turns real mock delegation into a reported leak"
domain-slug: domain/global
---

# Claim

`check-mock-module-leak` decides whether a `mock.module` factory key delegates to the real module by reading only the file the call stands in. A factory that delegates through a const imported from a sibling file delegates at runtime and reads as a stub to the check. Splitting a test file is enough to turn a clean mock into a reported leak, with the runtime behaviour unchanged.

# Evidence

Measured here on 2026-08-17 in the #19315 worktree. `packages/shared/graph/producers/src/file/ts-file/parse-mock-module-delegation.ts` builds the delegation base set from `collectSpecifierBindings`, which records a default import, a namespace import, or a const initialised from `await import(...)` — each only within the source file being parsed. `delegationBases` then grows that set through same-file const initialisers alone. A named import is never a base, so nothing reached through one can read as delegating.

`packages/temper/scripts/src/watcher/import-tasks-complete-forever.unit.test.ts` on `origin/main` is 15,346 characters and green on this check. It holds `const realPagesAccess = await import("@shared/pages-access")` beside its `mock.module` call, so `Page: realPage` and `getPages: (...args) => currentGetPages(...args)` both read as delegation.

The file was over the 15,000 character ceiling, so #19320 split it. The snapshot consts moved into a sibling helper and the test files imported them by name. The check then filed 27 findings across the three test files, naming `Page`, `getPages`, `getPage`, `applySelect`, `flattenRow`, `isPromotedKey`, `tryExtractIdEq`, `getSequenceConfig`, `parsePageSeq`, `patchPageById`, `softDeletePageById`, `PROMOTED_COLUMN` and `PageWriteError` — every one of which the split code still delegated. Its remedy line, "delegate to the real module", named an act already taken.

`check-mock-module-surface` pulls the same way: it requires the factory literal to stand in the test file. The two together mean the whole mock install — snapshot, mutables and scripting — has to sit beside the call, and cannot be shared with a sibling.

Not judged here: whether the analysis should follow named imports. The producer parses one file at a time and has no cross-file reach, so the reading would have to move to the graph consumer, which does hold the import edges. Against that, a mock install that is legible in one file is worth something on its own.
