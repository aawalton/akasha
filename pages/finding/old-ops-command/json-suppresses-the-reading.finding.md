---
id: 3f962a9e-49ad-59f6-b7f8-cdcdc7d74aa1
slug: json-suppresses-the-reading
page-type-slug: finding
title: "JSON suppresses the reading"
domain-slug: page-type/old-ops-command
---

# Claim

Every verb that declares `reading: "emits"` also declares `--json`, and in every one the JSON payload is written instead of the reading rather than alongside it — a convention no document states.

# Evidence

Eight verbs declare `reading: "emits"` in their help block: `agent delivery`, `elaine health-import`, `loki kernel-selftest`, `oauth census`, `persona faucet check`, `pipeline main-failures`, `tracking hourly-confirm` and `tracking hourly-confirm-stall`. All eight declare a `--json` flag, and in all eight the `if (json)` branch writes its payload and returns before `emitReading` is ever reached. The count is the whole population, not a sample: `reading:` appears in no other file under `tools/commands`.

`ReadingDisposition` in `tools/ops/surface.ts` is a bare `"emits"` type alias with nothing said about `--json` beside it. No domain document or page type mentions the reading channel, `emitReading`, or `ReadingDisposition`. `domains/readouts.md` is about the surfaces a person glances at, not about a verb's reading line, and binds nothing here.

The convention is load-bearing for a caller: `ops loki kernel-selftest` states in prose that its `--json` payload "keeps its own three words", meaning the reading's vocabulary survives the switch even though the reading itself does not. Nothing outside that one verb's prose says a caller passing `--json` should expect the reading to disappear.

Not measured: whether the eight agree on what the JSON payload contains beyond suppressing the reading, and whether any verb emits a reading without declaring `reading: "emits"` — `ops loki kernel` writes a coverage stanza to stderr and declares no disposition at all.
