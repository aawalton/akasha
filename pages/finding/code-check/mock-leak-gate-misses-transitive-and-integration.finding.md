---
id: 29bede07-98c7-5516-8b9f-5838d1457de5
page-type-slug: finding
title: "Mock leak gate misses transitive and integration"
domain-slug: domain/global
---

# Claim

`check-mock-module-leak` refuses only the direct, same-type case, and both `mock.module` contaminations observed in `packages/alanwalton/projects/cli` fall outside its declared scope — one reaching its victims transitively through a production module, the other corrupting `.integration.test.ts` suites, a type absent from the check's seven-type cohort. Its green is evidence that no in-scope leak exists, not that no contamination does.

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/code-quality/findings.md`, which recorded both specimens from `project-16964`. Both files are still live and both stubs still stand.

THE SCOPE IS DECLARED. `packages/infra/checks/src/checks/check-mock-module-leak.ts` is a registered check-step whose header states the mechanism exactly, then bounds it: consumers must runtime-import the stubbed export, sit in the same workspace package, and be "tests of any of the seven types `{unit,property,component,database,smoke,browser,cli}`". One exclusion is named outright — "Transitive consumers (sibling → production module → mocked module) are out of scope".

BLIND SPOT ONE, TRANSITIVE. `move-to.unit.test.ts:62` stubs `../lib/enforce-handoff-gate`. Read from the importer graph: the only runtime importer of `enforceHandoffGate` is `move-to.ts:27`, production code. No sibling test imports it; `move-to-obligation-gate.integration.test.ts` names it only in a line-17 comment. That is the quoted exclusion word for word.

BLIND SPOT TWO, INTEGRATION. `finish.unit.test.ts:71` stubs `@shared/supabase-server` so `createServiceRoleClient` returns `{}`. Here the consumers are direct — `obligations-write-boundary.integration.test.ts:32` and `move-to-obligation-gate.integration.test.ts:32`, same package. They escape on type: `integration` is not among the seven, and `rg -i integration` over the check's whole source returns nothing. 21 `.integration.test.ts` files are tracked.

WHY NEITHER SURFACES. The fan-out runs test types in separate processes, so the revealing arrangement never occurs in CI. Specimen one's victims PASS — six cases asserting a gate refuses, green against a no-op stub. Specimen two's fail on `sb.rpc is not a function`, naming the healthy component.

NOT MEASURED. 144 files call `mock.module`; how many consumer paths are transitive or integration-typed is not counted, nor whether the cohort omits `integration` deliberately.
