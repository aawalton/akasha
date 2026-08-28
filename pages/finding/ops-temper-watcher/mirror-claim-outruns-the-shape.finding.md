---
id: 01a045a4-974d-7000-b97b-4f1d1883e05f
slug: mirror-claim-outruns-the-shape
page-type-slug: finding
title: "Mirror claim outruns the shape"
domain-slug: domain/ops-temper-watcher
---

# Claim

`ops temper watcher logs` states in its own summary that it mirrors `ops loki logs`, and its `--json` answer carries two of that shape's six keys. `cursor`, `isDone`, `complete` and `boundedBy` are absent. A caller who takes the declaration and parses the answer reads four keys as `undefined` rather than as missing, and nothing reports the difference.

# Evidence

`tools/commands/temper/watcher/logs.ts:1` is the declaration: "Read workstation watcher.log + tray.log as JSONL ({timestamp, line, source, level}) — mirrors `ops loki logs`."

`:144` is the whole `--json` answer: `JSON.stringify({ lines: capped, count: capped.length })`. `tools/commands/loki/logs.ts:86` states the shape it claims to mirror: `{"lines": [...], "count": n, "cursor": <b64|null>, "isDone": bool, "complete": bool, "boundedBy": [...]}`.

The two keys that matter most are the two that report a bound. `:112` bounds the answer by `--since` through `parseLokiDuration`, and `:141` cuts again at `limit`, so this verb clips a window exactly as `ops loki logs` does — and says nothing about having clipped it. `complete` and `boundedBy` are what carry that report, and `ops loki logs` names them in the exit-code line at `tools/commands/loki/logs.ts:109` as how a caller tells a meaningful absence from an empty one.

Nothing binds the two shapes. `logs.ts:7` imports `parseLokiDuration` from `tools/lib/loki-fetch.ts` and nothing else; it never reaches `describeBounds` in `tools/lib/loki-diagnostics.ts`, whose only importers are `tools/commands/loki/logs.ts`, `tools/commands/pipeline/logs.ts` and `tools/tests/loki-diagnostics.test.ts`. `ops pipeline logs` does reach it, at `:174` and `:184-185`, which is what makes it the mirror this one only says it is.

The JSONL body differs too — `{timestamp, line, source, level}` against loki's `{timestamp, line}` — but the summary states those four keys outright, so a reader is told. The `--json` shape is where the declaration and the answer part company.

Not measured: whether any caller parses this verb's `--json` today. `ops tests triage-fanout` auto-detects `ops loki logs` JSONL rather than the `--json` object, so it is not the one exposed.
