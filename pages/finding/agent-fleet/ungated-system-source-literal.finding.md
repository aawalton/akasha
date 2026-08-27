---
id: 0ab8b083-7041-542a-8809-523402158c23
page-type-slug: finding
title: "Ungated system source literal"
domain-slug: domain/agent-fleet
---

# Claim

One `messages.source` literal in the tree is spelled outside the module that owns it, and no rule of `check-no-hardcoded-message-source` reaches it.

`packages/agents/shared/db-messages-write.ts:169` writes `source: "system"` inline in the deferred-notice ride. Rule 1 is scoped to a predicate position and rule 2 to the `system:` prefix, so a bare value in an insert argument falls between them. The file imports nothing from `wake-source-tags.ts`, so the value moves independently of `SYSTEM_SOURCE`.

# Evidence

Read on 2026-08-07 against `~/code`; I did not record the sha.

The site. `db-messages-write.ts` lines 162–174: inside `if ((row.senderAgentId ?? null) != null)`, each notice from `claimDeferredNotices` is inserted with `source: "system"` written as a literal. Its imports at lines 23–36 include `PENDING_MESSAGE_STATUS` from `./message-status` and nothing from `./wake-source-tags`.

Why no rule reaches it. `packages/infra/checks/src/lib/ts-messages-source-literals.ts` scopes rule 1 to a predicate: its raw-SQL arms are anchored regexes requiring a preceding `WHERE`/`AND`/`OR` before `source`, and its PostgREST arm keys on filter-method call shapes (`.eq`/`.neq`/`.in`/`.like`/`.ilike` as `(column, value)`, `.filter`/`.not` as `(column, operator, value)`). Rule 2 tests `PRECISE_TAG_RE = /^system:/`, which bare `"system"` does not match. Rule 3 is about `senderMatch` and is unrelated. `packages/infra/checks/src/checks/check-no-hardcoded-message-source.ts:70-75` exempts `.d.ts`, `.generated.*`, `CHECK_EXEMPT_DIRS`, `/dist/`, `/node_modules/` and `/migrations/` — none of which covers this file, so it is scanned and simply not matched.

What I did not measure. I did not run the check, only read its rules against the site; a shape I did not anticipate could still catch it. I did not look for other bare-`"system"` insert arguments elsewhere in the tree, so I cannot say this is the only one — the claim is about this site. I did not judge whether the deferred notice SHOULD carry the bare value rather than a precise tag; if it should, the repair is an import rather than a new tag, and if it should not, that is a routing decision I took no view on. I did not check whether any reader's `SYSTEM_SOURCE_FAMILY` filter currently misses these rows.

I did not repair it. Found while ingesting `dirty/knowledge/message-source-boundary.md`, whose `## What the gate structurally cannot see` records the same site; that document is quarantined and queued for removal, so the observation would go with the sweep if left there.
