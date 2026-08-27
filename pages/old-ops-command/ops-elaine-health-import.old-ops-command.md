---
id: ed9fb084-624e-50fc-b1a8-e5af9ef44241
page-type-slug: old-ops-command
title: "Ops elaine health-import"
slug: ops-elaine-health-import
domain-parent-slug: domain/ops-elaine
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/elaine/health-import.ts
path: elaine health-import
irreversible: true
---

# Definition

- **Ops elaine health-import** — every activeEnergy and stepCount record of a macbook export, upserted into the sample store.

# Design

A stored sample whose value differs is overwritten rather than kept, so two distinct samples colliding on the key lose one. The run counts what it overwrote and cannot tell that case from a reading Apple revised.

# Help

Import Alan's HealthKit history — active energy and steps — from an 'Export All Health Data' archive dropped on the macbook into the raw sample store, one row per `<Record>`. Reads the newest ~/Downloads/export*.zip (or --path <file>) over ssh, reduces it Mac-side to the two metrics so the archive never crosses the wire whole, and writes in batches through the typed access boundary.

Runs from the workstation: no phone build, no install, nothing extracted to disk. Read-only against the macbook.

SAFE TO RE-RUN. Samples are keyed on (metric, source, start, end), so a second run against the same export adds nothing, and a run against a NEWER export adds only the days since the last one. An interrupted run resumes where it stopped rather than rewriting what it already wrote.
