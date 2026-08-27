---
id: fa66fe05-0a7f-507a-ba4a-8a8df870eec2
page-type-slug: finding
title: "The harness fetches agent rows through code functions that decide nothing, against its own Design"
domain-slug: domain/agent-harness
---

# Claim

The harness fetches agent rows by calling code repository functions that decide nothing, which `domains/agent-harness.md` Design says it does not do. `tools/lib/spawn-seat.ts` and `tools/commands/seat/start.ts` both call `db.getAgentByName` from `@agents/shared/db`, which does one page read and maps the row. `db.getAgent` is called the same way from at least eight more `tools/commands/seat/` modules, and twenty-three modules under `tools/` import that package.

# Evidence

Found during the review-instructions reading of `domains/agent-harness.md` on 2026-08-19, and left standing there rather than changed: `page-types/domain.md` "Every Changed Line" wants Alan shown a Design line before it moves, and the reviewer could not settle whether the line goes back to Intent or the row reads move off `@agents/shared/db`.

Measured by reading `packages/agents/shared/db-agent-resolve.ts:115` and grepping `tools/` for imports of `@agents/shared/db`. Not measured: whether any other `@agents/shared/db` function the harness calls decides rather than fetches, and whether Alan already holds evidence that would settle which way the line should move.
