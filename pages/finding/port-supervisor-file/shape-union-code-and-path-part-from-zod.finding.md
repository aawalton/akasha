---
id: ea231bfa-d5d7-5739-9fab-745a602a42c3
slug: shape-union-code-and-path-part-from-zod
page-type-slug: finding
title: "Shape union code and path part from zod"
domain-slug: domain/global
---

# Claim

`domains/tasks/agent-harness/port-supervisor-file.md` states that where `shape` replaces `zod`, "the issue's `code`, `path` and `message` agree". Two of those three do not agree wherever a UNION turns every member away — an ordinary shape for a ported schema rather than an edge. `tools/lib/shape.ts` already declares that divergence; the task document's compressed restatement of it contradicts it.

# Evidence

Measured on 2026-08-12 while porting `packages/agents/shared/session-jsonl-schema.ts`, by driving both implementations over the same 1,018 inputs and projecting every answer at `code`, `path` and `message`. 858 answers agreed exactly. 160 did not, and every one of the 160 was a refusal from a union both of whose members failed:

- `code` is `invalid_union` under `shape` and `custom` under `zod` 4.4.3, on all 160. `zod` promotes the member `.refine`'s own issue.
- `message` is `Invalid input` on both, on all 160 — so the sentence holds for `message` alone.
- `path` agrees on 132 and differs on 28. A content block refused inside a user line's string-or-array `content` sits at `message.content` under `shape` and at `message.content.0` under `zod`, because the outer union is what refuses on the `shape` side and the inner array index never enters the path.

Every accept-or-refuse DECISION agreed on all 1,018, and every accepted value came back identical, so nothing here is a defect in `shape` — it is the pinned divergence `tools/lib/shape.ts` declares, met in the field.

What makes it worth filing rather than absorbing: a seat that reads only the task document expects three fields to match, sees two of them move, and has to re-derive the whole ruling from `tools/lib/shape.ts` before it can tell a real port defect from the known one. The frozen digests in `tools/tests/session-jsonl-schema-frozen.ts` record the quantities above.
