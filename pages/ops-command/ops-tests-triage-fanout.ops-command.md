---
id: fd789a7b-d3e6-5fb7-b02d-11225608ddee
page-type-slug: ops-command
title: "Ops tests triage-fanout"
slug: ops-tests-triage-fanout
domain-parent-slug: domain/ops-tests
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tests/triage-fanout.ts
path: tests triage-fanout
---

# Definition

- **Ops tests triage-fanout** — the verdict a consolidated fan-out pod log carries, read whole rather than from its tail.

# Help

Triage an exit-123 on a consolidated per-test-type fan-out pod by scanning the FULL multi-workspace log — never a tail/last-summary proxy.

The consolidated CI pods (`check-unit-tests` / `check-property-tests` / `check-component-tests`) fan out across many workspaces in ONE interleaved log; under `set -e -o pipefail` a single workspace's real failure becomes `xargs` exit 123. The LAST-finishing workspace's ` 0 fail` summary is NOT the step verdict — another workspace earlier in the same log can have failed. Reading the tail sees the final green summary and wrongly concludes 'false-eject' (a phantom defect). This command computes the real verdict — 'any workspace failed' — from a whole-log scan.

TRUST THE VERDICT, AND TRUST THE LOCATION ONLY WHERE ONE IS CLAIMED. Every line of a worker's `bun test` output carries its own `[fanout-ws:<pkg-root>]` producer tag, so a failure takes the header its own worker emitted rather than whichever concurrent worker happened to interleave there. Each fail signal reports the basis it got: `producer-tagged` (the line named its producer), `single-stream` (no fan-out runner anywhere in the log, so the one producer is its own), or `declined` — and a decline carries NO file and NO workspace rather than naming one it cannot establish. On a decline, resolve the owner by searching the repo for the failing TEST NAME from the fail evidence. A log captured before the tagging runner was live declines every line, and nothing on the read side can recover a producer it never carried.

CI-triage instance of dead-or-clean-reporting tooth (a): query the AUTHORITATIVE artifact (the full log), never a proxy (the tail summary).

Reads the log from stdin: plain text (one log line per line) OR `ops loki logs` JSONL (`{timestamp, line}`, auto-detected and sorted chronologically).

Exit codes (scriptable verdict):
  0  green — every workspace passed (a summary was produced and no `N fail` > 0)
  1  fail  — at least one workspace failed (some `N fail` > 0 or a `(fail)` line)
  2  indeterminate — no `bun test` summary found (crash / truncated log); cannot prove green. Re-fetch with `--all`, never `--limit <n>`: a `--limit` fetch is a bounded TAIL window, and `--limit 9999` errors outright (above Loki's 5000-line cap).
