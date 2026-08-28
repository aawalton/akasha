---
id: e957af90-f5c1-5715-b26e-0456d62e351a
page-type-slug: finding
title: "A disarmed mock dials the live world"
domain-slug: domain/test
---

# Claim

A `mock.module` naming a bare `@shared/*` specifier is silently disarmed where the
package declares no `"."` export. Only `"./*"` is declared, the subject imports a subpath,
and the key matches nothing. The test then runs against whatever is really there. Measured,
that is Alan's live site and a deleted in-cluster service — not a stub, and not merely a red
test. Nothing at the call site distinguishes a mock that took from one that matched nothing.

# Evidence

Run 2026-08-28 against `/var/home/walton/repos/akasha`, Bun 1.3.14, with `globalThis.fetch`
replaced by a thrower printing each URL. The thrower announces itself on load, so a silent
run is distinguishable from a control that was never installed.

`smilingjenny/web/app/routes/api.categorization.unit.test.ts:11` mocked
`@shared/monarch-categorization-access`. `api.categorization.ts:2` imports `.../ring-relay`,
and `ring-relay.ts:21` calls `fetch`. The control printed
`fetch fired: https://alanwalton.com/api/categorization` four times in one run. 9 pass, 2
fail, 587ms.

`api.safety-level.unit.test.ts:60` mocked `@shared/status-bar-access`.
`api.safety-level.ts:2` imports `.../stoplights`, so real reads dialled
`http://page-query-service.page-query-service.svc.cluster.local:8787/q/safety-level-on-day`
at 5000ms a try. 5 pass, 5 fail, 13.09s.

Mocking the subpath the subject imports closed both: 11 pass, 0 fail, 160ms; and 10 pass, 0
fail, 162ms — control installed both times and never firing. The 13.09s to 162ms drop is the
retry loop going.

Census: 190 `mock.module` sites in source. Nine name a bare `@shared/*` package, across five
packages. `status-bar-access` and `monarch-categorization-access` declare no `"."` and were
disarmed. `supabase-server`, `open-questions` and `pages-query` declare one and are armed.

I did not sweep specifiers built from a template literal or a constant.
