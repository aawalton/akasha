---
id: 6060a99a-44b7-533b-936b-77917396df6b
slug: preview-passes-as-read
page-type-slug: finding
title: "Preview passes as read"
domain-slug: domain/agent-harness
---

# Claim

A large `tools/read.ts` result is saved to a file and reaches the calling agent as a preview of about two kilobytes, while the read record, written at the moment of the call, claims the whole read. An agent drafting from the preview passes `read-before-write`, `read-what-governs` and `read-the-schema` on documents it never saw. This is what `read.ts` refuses a pipe for, and it is invisible from inside the tool: its output went to a terminal in the ordinary way.

# Evidence

Observed directly: a single `bun tools/read.ts` call covering three paths returned about 50KB — the three files plus 25 governing documents — and was saved to a file rather than shown.

It happened again while this finding was being filed. One `ops instructions read --file-path domains/agent-harness.md` returned 42.4KB, being the 111-line file plus 14 governing documents and 2 drawn-in terms, and what came back was a preview of the leading 2KB and a path to the rest. The body was recovered by a native Read of that path, under `~/.claude/accounts/`, which is outside either gated repo and which the tool's help does not name as a route.

Not measured: where the size threshold sits or whether it moves; whether the preview is always the leading 2KB; whether anything downstream of the read record would catch the gap; whether the harness treats other commands' output the same way.
