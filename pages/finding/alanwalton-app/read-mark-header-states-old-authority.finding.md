---
id: 5a01a121-1f00-56b7-bfc5-7f9ff679247c
slug: read-mark-header-states-old-authority
page-type-slug: finding
title: "Read mark header states old authority"
domain-slug: domain/alanwalton-app
---

# Claim

The header docblock of the awen read-mark write boundary states a completion authority the code stopped using. `mark-turn-read.server.ts:3-6` says the function marks a turn complete "by writing `progress = length`", and that "'fully read' is `progress >= length`". The body's authority is `completedAt` presence: it returns early on `turn.completedAt != null`, and the read path derives `fullyRead` from that presence. Someone taking the fully-read test off the header writes the superseded one.

# Evidence

Read live on 2026-08-08 in `~/code` on `main`, while ingesting `dirty/code/packages-alanwalton-web-app-awen-claude.md`.

The header. `packages/alanwalton/web/app/awen/lib/mark-turn-read.server.ts:3-6`, verbatim: "this marks that turn's per-user reading progress complete by writing `progress = length` on the `game-turn` row — mirroring how story chapters persist read-state as a `progress` attribute, so 'fully read' is `progress >= length` on both the story-chapter reader and here".

The body disagrees. Same file, `markTurnRead`: `select: ["length", "completedAt"]` at line 66; the idempotence guard at line 75 is `if (turn.completedAt != null) return { ok: true, status: 200 }`; the write at line 84 is `set: { completedAt: new Date().toISOString(), progress: length }`. `progress` is still written, but it is no longer the test — `completedAt` is, and the inline comments at 73-77 say so, naming #15380.

The read path sides with the body. `lib/story-session-compose.ts:48` is `return row.completedAt != null`, its comment at 42-45 stating the change outright: "the same 'fully read' test the story-chapter reader now uses (completedAt presence, not progress >= length)". `lib/awen-story.server.ts:54` selects `completedAt`; `lib/client-story-session.ts:77-78` folds it to the client `fullyRead` flag.

The disagreement is inside one file: its top-of-file docblock against its own function, three sibling modules siding with the function. Nothing reports it — no mechanism in `ops enforcement list` (232) compares a docblock against the code beneath it.

Against the standing records: `pages/finding/collections/last-read-ignores-completion.finding.md` and `completion-markers-unfilled.md` both concern `completedAt`, but in `packages/collections` — a selector ignoring the field, and row data unevenly filled. I opened both; neither is about prose stating a superseded authority, and neither touches `packages/alanwalton/web`.

Not established: whether the story-chapter reader's own modules carry the same stale phrasing. I checked only the awen side.
