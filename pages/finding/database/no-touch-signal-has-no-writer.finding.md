---
page-type-slug: finding
slug: no-touch-signal-has-no-writer
title: "The no-touch signal the updated-at trigger reads is set by nothing"
domain-slug: domain/database
---

# Claim

`setUpdatedAt` declines to bump `updatedAt` when the session setting `app.skip_updated_at_touch` reads `on`, and nothing in this repository sets it. The four `page_patch*` procedures that used to set it are gone in every form, so the guard's skip branch is unreachable from anything here: the test always passes and every patch touches `updatedAt`. The no-touch behaviour the setting exists to produce cannot happen, and nothing reports that — a trigger whose skip branch is dead reads exactly like one whose skip branch is never wanted.

# Evidence

Measured 2026-08-27 over the whole tree, untruncated.

THE READ. `shared/triggers-proc/src/set-updated-at.ts:9` is `ctx.currentSetting("app.skip_updated_at_touch", true) !== "on" &&`, guarding `ctx.NEW.updatedAt = ctx.now()`. It is exported from `shared/triggers-proc/src/index.ts`, and `shared/triggers-proc-compiler/src/compile-lower.ts:151` lowers `ctx.currentSetting` to plpgsql `current_setting`, so this is a deployed trigger rather than dead TypeScript.

THE ABSENCE OF A WRITER. `git grep -n` for `skip_updated_at_touch`, `skipUpdatedAtTouch` and `skip-updated-at-touch` over the whole tree returns three lines: the read above, and `shared/triggers-proc-compiler/src/compile.unit.test.ts:118` and `:131`, where the same key string stands as a compiler fixture rather than a setter. No `set_config` call names it — every `setConfig`/`set_config` hit in the tree is an unrelated Temper addon test helper or a `charsetConfig` substring.

WHAT USED TO WRITE IT. The setters were the four `page_patch*` procedures, each running `PERFORM set_config('app.skip_updated_at_touch', 'on', true)` when every key being set was `lastViewedAt` or `loreIngestedAt`. No `page_patch` procedure exists in any form now: `git ls-files '*.sql'` returns 0 for the whole repository, and no `.ts` defines one. Four documents under `shared/pages-access/` still describe the patch RPC, but they describe an interface rather than declare a procedure.

NOT MEASURED. Whether anything sets the parameter at runtime outside this repository — a procedure deployed to the live database from an older tree, or a session-level `SET` from a client. That needs a query against the database, which this reading did not make. What is established is that nothing in this repository writes it.

Found while verifying `database/page-patch-touch-diverges` before removing it: that finding compared the four procedures' use of this setting, and the procedures went while the trigger reading them stayed.
