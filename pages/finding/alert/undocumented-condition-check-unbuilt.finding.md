---
id: 38e00a9e-0916-59ca-9990-eb926cb73ca9
page-type-slug: finding
title: "Undocumented condition check unbuilt"
domain-slug: page-type/alert
---

# Claim

In alert, #19226 carries forward #18963's unbuilt objective: a check refusing any alert-condition write whose slug names no document under `domains/alerts/`, plus a second criterion that the check fail rather than go unseen on a condition it cannot resolve. Neither is built. The downstream backstop in `tools/lib/alert-observer.ts` already reports an undocumented condition once it fires, and the resolution path was first exercised live 2026-08-15, across two of the fleet's seven firing sites.

# Evidence

Project #19226 (parent #18963), alert, status awaiting_worker_seat. Objectives: (1) a check on the shared alert-condition-event writer refuses a write whose condition has no document under `domains/alerts/`; (2) the check states how many conditions it measured and fails on one it cannot resolve.

Origin: #18963's first objective — "Every alert the fleet can emit has a document under `domains/alerts/`. A check walks the emitters and refuses one whose alert has no document." — never built; tree closed 2026-08-15, gap carried forward as `no-check-refuses-an-undocumented-alert`.

Established: one chokepoint, `@agents/shared/alert-condition-event`, seven callers — four under `packages/agents/devops-monitor/src/`, `packages/agents/shared/agent-kill-alert-send.ts`, `packages/agents/infra-alert-bridge/src/recorder.ts`, `packages/infra/ci/slow-suite-sweep/src/run-sweep-and-notify.ts`; schema `condition: z.string().min(1)` takes any non-empty string. Four shapes, three readable: `slow-suite-red` (`SLOW_SUITE_RED_CONDITION`), six agent-kill causes (`CONDITION_BY_CAUSE`), ten devops-monitor wedges (`src/wedges/`); 73 Prometheus rules, `conditionSlug(envelope.infra_alert)`, kebabbed at runtime, generated, checkout-absent.

Backstop live: `tools/lib/alert-observer.ts` routes an unmatched event into a lane reading "Each of these fired somewhere and reached nobody" — reported, only once fired.

Route exercised 2026-08-15: #18963 closed with `alert.condition.fired`/`cleared` never written; hours later `subscriber-lag` fired 18:56:18 from `devops-monitor`, `infra-alert-bridge` wrote six more for `query-plan-drift-regression`, fired and cleared both. `ops alert observe` matched all eight, delivered, incl. two re-raises at 15min for an uncleared condition; run after: "raised 0 unmatched 0 open 2". Two of seven sites now exercised.

Constraint: `page-types/alert.md`'s `code-path:` caps at five globs, sites number six — filed as `code-path-caps-at-five-and-the-firing-sites-are-six`. The seven callers are the honest population; `code-path:` is not.
