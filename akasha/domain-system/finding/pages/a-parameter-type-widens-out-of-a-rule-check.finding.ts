import type { Finding } from "../finding.page-type.ts"

export const aParameterTypeWidensOutOfARuleCheck = {
  id: "01a05c12-ce1a-7b11-aea1-0fae37e720d0",
  pageTypeSlug: "finding",
  slug: "a-parameter-type-widens-out-of-a-rule-check",
  domainSlug: "domain/akasha-check",
  claim:
    "no-rule-in-two-files reads a rule as a function's token string, and that string carries parameter type annotations. Two functions with identical bodies do not refuse each other when they name different parameter types. `isJsonObject(value: Json)` and `isRecord(value: unknown)` have byte-identical bodies and stand side by side. What this check counts is the least there could be, and widening a parameter type is a way out from under it that nothing states.",
  evidence:
    'code-rule.module.code.ts:27-45 builds a rule as the parameter tokens, `=>`, then the body tokens, with each name a function binds replaced by `$0`,`$1` in the order they are bound, at line 39. Every other identifier stands verbatim, parameter type annotations among them. The pair: `isJsonObject(value: Json)` at pages-system/pages-core/json-patch/apply/apply.module.code.ts:166 and `isRecord(value: unknown)` at idle-system/idle-accrual/idle-accrual.module.code.ts:195 both read `return value !== null && typeof value === "object" && !Array.isArray(value)`. The audit over 4388 files refuses neither. Alongside this, a worry that the check over-matches empty bodies was tried tonight against the ten files it refused on them, and the check came out right in eight: seven `noNap` sleepers now reach one fixture at pages-query/store-reaching/store-reaching.module.test-fixtures.ts:3 through `@akasha/pages-query/fetcher/testing`, and `markSettled` at pages-ui-store/optimistic/optimistic-mutation/optimistic-mutation.module.code.ts:133 became a `Promise.withResolvers` resolver rather than a name assigned later. Only the two `noop` callbacks were unrelated, and the one in regular-pipeline had a single use, so spelling it there cleared the pair without inventing a shared do-nothing. So what is loose is the annotation, not the empty body. No check was changed: Alan Approves Checks reserves what a check refuses to Alan.',
} as const satisfies Finding
