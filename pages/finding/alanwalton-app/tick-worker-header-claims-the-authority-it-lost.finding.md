---
id: 3971ec32-87f1-5d60-87fd-7886efdc38ff
page-type-slug: finding
title: "Tick worker header claims the authority it lost"
domain-slug: domain/alanwalton-app
---

# Claim

The idle tick worker's header docblock calls itself "the SERVER-AUTHORITATIVE idle tick — the SOLE writer of game state" and states that "the client never writes authoritative state", while line 77 of the same file says the client store is the sole authority and the save route it feeds accepts whole client blobs and stores them verbatim. A reader of the file meets the inverted claim first, in the position that describes the whole module.

# Evidence

Read in `~/code` on 2026-08-08, emptying `dirty/code/packages-alanwalton-web-app-idle-claude.md`.

`packages/alanwalton/web/workers/idle-tick.worker.ts` is tracked and live. Its header docblock opens at line 3: "The SERVER-AUTHORITATIVE idle tick — the SOLE writer of game state." Lines 7-8 continue: "The client never writes authoritative state; it only extrapolates between server writes."

Line 77 of the same file says the opposite: "The client store is the sole authority (`app/idle/CLAUDE.md`) — it loads the blob once at boot and banks its own offline accrual."

The wiring settles it for line 77. `app/routes/api.save.ts` has two branches. The draw branch is the one server-authoritative act. The other, at lines 130-151, executes `save = parseIdleSave(body)`, then `await upsertSave(ctx.supabase, ctx.userId, save, ...)`, then returns `{ ok: true }` — no apply, nothing to adopt back. On the client, `app/idle/lib/idle-game-store.ts` holds one `state` with no `serverState` and no pending queue; `dispatch` calls `commitIntent` (`idle-apply.ts:31-34`) and replaces state in place. Its wired suite proves the client does not wait on the server: `idle-game-store.unit.test.ts` builds the store with `fetch: () => new Promise<Response>(() => {})`, a fetch that never resolves, dispatches a train, and asserts `expect(rankOf(store.getSnapshot().state, "aura")).toBe(2)`.

The header does not merely drift on a detail. It names the authority, which is the first fact a reader needs before changing anything in the file, and names it backwards. Line 77 corrects it 74 lines later, inside a paragraph about tick lateness that a reader has no reason to reach.

The document line 77 cites is gone: `git ls-files` over `packages/alanwalton/web/app/idle/CLAUDE.md` returns nothing, `7205e28efd` having moved it into the instructions repository under quarantine, where this seat emptied the cited passage. So the header is now the only prose in the file's own tree naming the authority.

Both statements are comments; the file compiles and its tests pass.
