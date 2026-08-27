---
id: db18c8bf-8e00-5d32-9ce1-c5ebc97d12be
page-type-slug: finding
title: "Prometheus package cites a deleted write up"
domain-slug: repo/code-repo
---

# Claim

Thirteen live lines across eleven files in the Prometheus package cite `docs/alert-authoring.md`, a document deleted from this repository that did not land anywhere else under any name. Each citation reads as an openable authority and is not one, so a reader sent to it for the reasoning behind an alert's shape finds nothing.

# Evidence

Verified absent by four routes on 2026-08-11, not only by the path the citations spell, since a deletion cannot be grounded by deleting. Name route: no file, and no `docs` directory under `packages/infra/k8s/prometheus` at all. Content route across the instructions and memory repositories, searching what such a document would have to say rather than what it was called — `three-rung`, `wall-clock arithmetic`, `persisted-state advancement` — returns nothing; the nearest live candidate by name, `domains/alert.md`, is a three-line domain definition carrying none of it. History route: commit `7205e28efd`, "quarantine every instruction surface into the instructions repo", deleted it with eight siblings under the same directory, none of which surfaced afterwards.

The citing files, by grep over worktree `18682` at `c8570f8981`: ten under `packages/infra/k8s/prometheus` — `domain-expiry-constants.ts`, the domain-expiry and git-mirror alert and exporter sources with their unit tests, `synth-alerts-query-perf.ts` and `synth-alerts.unit.test.ts` — plus the fixture `prometheus-rule-tests/git-mirror.test.yml`.

What they reach for is not one thing. Some cite it for the three-rung split, some for the persisted-state-advancement principle — alert on advancement rather than liveness, a CronJob being able to run while dead to its own output — and one names "the compliance test in docs/alert-authoring.md, which no mechanical check decides". So the repair is not one substitution.

ALREADY REPAIRED WHERE SOMEBODY OWNED IT. `check-prometheus-rules.ts` cited it over its life; `cd355abf9f` under project 18553 replaced the path with a sentence, and project 18619 replaced that sentence with what the rung enforces. Neither reached the eleven files outside the checks package.

NOT MEASURED. Whether the deleted text is worth restoring, or whether each site should carry its own reasoning. Header By Hand bars gating prose against the code beneath it, so either way it is a hand repair per site.
