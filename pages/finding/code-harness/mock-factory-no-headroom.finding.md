---
id: 34122458-4baf-5ff5-aa7f-3f8a0c129867
page-type-slug: finding
title: "Mock factory no headroom"
domain-slug: domain/global
---

# Claim

`resolve-question.server.unit.test.ts` sits at exactly 500 lines on main, the file-length cap with zero headroom, and because it holds three `mock.module` factories that must superset each mocked module's runtime named exports, any agent adding an export to a module mocked in that file is forced to add lines to a file that cannot accept a single one.

# Evidence

File: `packages/alanwalton/web/app/questions/lib/resolve-question.server.unit.test.ts`. Per `.claude/docs/mock-module-surface.md`, a `mock.module` factory must superset the module's runtime named exports.

#16258 hit this 2026-07-25: added `listPersonaWakeSources`/`personaTargetsFromRows` to `@agents/shared/persona-wake-slugs`, required growing the factory to clear `check-mock-module-surface`, ejected from the merge queue at 502 lines. Three worlds measured: main 500, branch 502, merged 502 — main contributed zero, so the branch failed standalone.

Why the obvious split (a second test file) is wrong: `check-mock-module-leak` is a live CI step (`packages/infra/checks/src/checks/check-mock-module-leak.ts`, exit 0 on pipeline 26020) and duplicating the mock harness into a second file in the same package is exactly what it catches — installs are process-global, rebinding shared slots for every later-loaded file. Also load-order-sensitive: real fns must be snapshotted into consts before install, since Bun live-rebinds `import *` once installed; moving ~355 lines across a module boundary changes ordering.

Only split that works: extract the mock harness into a shared module with snapshot ordering preserved/asserted; keep the benign-default wrapper pattern (factory reads a mutable binding defaulting to a pre-install snapshot const, tests point it at a recording stub, `afterAll` resets); verify `check-mock-module-leak`, `check-mock-module-surface`, `check-file-length` green; leave headroom.

Interim: #16258 neither suppressed nor split. Removed lines 153-158, a near-verbatim restatement of lines 11-20 (Omit Needless Ink on its own merits), taking the file 502 to 500 — legal, buys nothing durable, steps over the trap rather than disarming it (#16258 said so itself, unprompted). The next agent adding an export to any mocked module here hits the same corner with no headroom left.

Project #16361, someday_maybe, code-harness, no objective; from retired `notes`, 2026-08-15.
