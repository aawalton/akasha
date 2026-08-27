---
id: ab93ff2e-c611-569e-98fb-2a31799d41c9
page-type-slug: ops-command
title: "Ops temper watcher logs"
slug: ops-temper-watcher-logs
domain-parent-slug: domain/ops-temper-watcher
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/watcher/logs.ts
path: temper watcher logs
---

# Definition

- **Ops temper watcher logs** — the workstation's watcher and tray logs as one newest-first stream of parsed records.

# Help

Read the workstation's TemperWatcher log files (watcher.log + tray.log) as a single newest-first JSONL stream.

Each emitted record has shape `{timestamp, line, source, level}`:
  - `source`: "watcher" (TS uploader) or "tray" (Rust tray binary)
  - `level`:  "INFO" | "ERROR" | "WARN"
  - `timestamp`: ISO-8601 (ms precision for watcher, second precision for tray)

Lines that fail to parse against their source's expected format are warned
to stderr and skipped. Missing files: a warning is emitted for the missing
side and the present side is returned; both missing → exit 2.

Default stdout (JSONL):
  one {"timestamp", "line", "source", "level"} per line, newest-first

--json stdout (single aggregate object):
  {"lines": [...], "count": number}
  No `cursor` field — these are local files, not a paginated query.
