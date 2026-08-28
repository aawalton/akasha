---
page-type-slug: finding
slug: editor-saves-fail-unreported
title: "A bare catch and a discarded promise leave every block-editor save failure reported nowhere"
domain-slug: domain/page-writes-system
---

# Claim

`shared/pages-ui/src/block-editor/use-block-persistence.ts:84` catches every block-editor save failure with a bare `catch`, and `block-editor.tsx:73` discards the promise with `void`. Because `:94` attaches `.catch(() => undefined)` to it, no `unhandledrejection` fires, so the one route from a browser failure to an `error` page never sees it. Off the workstation the fallback `resync()` fails too and the typed text stays on screen, unsaved and reported nowhere.

# Evidence

Read 2026-08-28 at `7d93784c33`.

Every layer below the UI refuses. `pages-access/src/patch.ts:45-46` throws before any transport; `over-server.ts:66`, `:76`, `:86` throw `ServerWriteError` on a dead fetch, a non-JSON reply, any non-2xx; `file-read.ts:93` and `:97` throw `RosterUnreachable` rather than read an unread roster as empty; `optimistic-mutation.ts:143-148` lets the throw reject `tx.isPersisted`, and `apply-prediction.ts:27` awaits it.

The premise that these are Supabase-backed is stale: all 14 `supabase` mentions in `shared/pages-access/src` are `import type { Json }`. Browser writes POST `/api/page-write` on their own origin (`over-server.ts:5`, `:46-48`); a dropped table is not on this path.

The swallow is in the UI. `use-block-persistence.ts:59-86` wraps both write branches in one `try`; `:84` is a bare `catch` — no binding, no log, no report — whose body is `await resync()`, and `resync` at `:48-53` is a second `patchPage`. With the transport down both fail alike and the second throw leaves `runOne`. At `:94` `chainRef.current = next.catch(() => undefined)` attaches a handler to `next`, marking it handled; `block-editor.tsx:73` discards it with `void enqueue(prev, op)`. The only browser route to an `error` page is `window.addEventListener("unhandledrejection", ...)` at `errors-client/src/setup-global-error-handlers.ts:74`, which a handled rejection never raises.

That catch also hides a standing refusal. `refuseJsonPatch` at `file-write.ts:200-206` throws whenever `patch !== undefined`, and `use-block-persistence.ts:71-76` always passes one, so every editor op but the first is refused client-side and only `resync` writes. On the workstation it succeeds, so the refusal is invisible there.

Nine packages depend on `@shared/pages-ui`, and `page-default-content.tsx` mounts `BlockEditor`.

Control: that search found nothing in `block-editor.tsx` and 21 lines in `pages-query/src/index.ts`, path alone changed.

Not measured: no run was made; nothing records a lost save, which is the finding.
