---
id: 0f4b19e0-4e0b-5bac-81be-14752e65fb4b
slug: read-gates-mtime-not-blob
page-type-slug: finding
title: "Four read gates asked about mtime rather than the git blob, so an identical-bytes touch deadlocked a seat"
domain-slug: domain/global
---

# Claim

Four read-tracking gates asked whether a file's mtime had moved, so `touch` alone — identical bytes — refused every write, and Read then declined to record the re-read the refusal demanded, deadlocking the seat. If the bytes are identical there is no work to destroy, so the blob is the question the gate was always asking and the timestamp was only ever a proxy for it. All four now compare the recorded git blob, guarded so a record predating blob recording behaves exactly as before.

# Evidence

`tools/lib/unread.ts` (behind read-what-governs), `tools/gates/read-before-write.ts` and `tools/gates/read-the-page-type.ts` (78316ac7f), and `tools/lib/hold-seat-verdict.ts` (3281e385b), each held `readAt !== changedAt` against `statSync().mtimeMs`. Each now computes `sameBody = reading.blob !== null && reading.blob === blobId(bytes)` and refuses on `readAt !== changedAt && !sameBody`.

Not visible in the diff: all four passed `changedAt` to `firstUnreadLine`, which was safe only because they had already established `readAt === changedAt`. `firstUnreadLine` returns 1 whenever `entry.at !== at` (tools/lib/read-log.ts:140), so once `sameBody` admits a moved mtime, passing `changedAt` reports the whole file unread — and in read-the-page-type, which threads it through a `continue`, it could instead wave through a reader who had seen only part. All four now pass the recorded `readAt`.

Seven cases were proved per gate on a fixture, negative control first. Unchanged: a just-read file passes, genuinely changed content still refuses, a record carrying no blob still refuses. Changed: a moved mtime over identical bytes now passes, whole-read and via merged spans alike, and a partial read whose mtime moved reports line 5 of 11 unread, not line 1 and not a pass.

On real files, `page-types/persona.md` and `domains/code-quality.md` were touched, bytes untouched, and all four gates passed. The pre-fix `unread.ts`, extracted from `78316ac7f^`, refused `domains/code-quality.md` against the same read record the fixed one cleared.

Two measurement traps. Reading mtime in Python as `st_mtime * 1000` is lossy: over one seat's 122 records it reported 41 files moved and 16 byte-identical, where Bun against `mtimeMs` reported 25 and 0. Use `st_mtime_ns`. And restoring an mtime with `utimesSync(f, new Date(ms))` truncates sub-millisecond precision — 653us and 234us lost here — which forces a re-read on every agent holding a pre-blob record; `os.utime(f, ns=...)` is exact.
