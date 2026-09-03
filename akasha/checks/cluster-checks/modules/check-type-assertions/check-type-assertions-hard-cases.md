---
description: Type-assertion findings that lack a clean fix and warrant follow-up projects, grouped by structural pattern.
---

# Type-assertion hard cases

Hard cases surfaced during the project #8982 type-assertion cleanup swarm —
findings where a clean fix isn't available with the standard toolkit (brand
constructors, type predicates, encapsulation helpers, generics, `satisfies`).
Grouped by underlying structural pattern; each group lists the affected
packages, the pattern, and the resolution path — including which patterns
warrant their own follow-up project.

---

## 1. Generic type parameter at string boundaries

**Affected**: `packages/shared/design` — `Tabs<TValue extends string>` in
`patterns/src/components/tabs.tsx` (3 findings).

URL strings and Radix's `(value: string) => void` callback don't carry
runtime evidence for `TValue`; the cast happens at the `string ↔ TValue`
boundary. **Resolution** (#9063): drop the unused generic — all 9 callsites
pass plain `string`. Props become `string`, `searchParams.get` is already
`string | null`, `JSON.parse` narrows via `typeof === "string"`, Radix matches.

---

## 2. Generic mapped-type construction inside loops

**Affected**: `packages/shared/design` — `useFilterPersistence` (resolved in
#9065).

Build a value of `V` by iterating over `Fields<V>`. TS structural mapped-type
tracking doesn't survive `for…in`, so the close of construction needed
`restored as V` / `values as V`. **Resolution**: extract a helper that uses
user-defined type predicates (`record is V`) to narrow `Partial<V>` to `V` —
`buildValuesFromFields` in
`packages/shared/design/patterns/src/utils/build-values-from-fields.ts` is
the canonical example. Apply the same pattern to other mapped-type
construction loops as they surface.

---

## 3. ESO API saved-variables boundary

**Affected**: `packages/temper/addons/characters/src/saved-variables.ts`
(1 remaining finding).

Each addon called `ZO_SavedVars.NewAccountWide(…) as unknown as
SavedVariablesData` because the ESO API returned `Record<string, unknown>`
while each addon wrote through with its own typed shape. **Resolution**
(#9070): genericize the API definition itself —
`NewAccountWide<T extends Record<string, unknown>>(defaults: T): T` infers
the return type from the typed defaults argument, eliminating the cast at
every callsite where the defaults match the addon's full shape.

The remaining cast in characters is structurally distinct: its
`SAVED_VARIABLES_DEFAULTS` is intentionally narrower than
`RawSavedVariables` (e.g., `account: { achievements: Record<string, never> }`
vs the full `AccountCompletion`), and the runtime fixup happens inside
`migrateFromFlatStructure`. Tracked as #9072 — fix is to absorb the bridge
into `migrateFromFlatStructure`'s return type so the call site stays
cast-free.

