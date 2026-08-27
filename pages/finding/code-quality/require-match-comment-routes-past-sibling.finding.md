---
id: 0724f97a-5e7c-526a-8f69-ca25cd8b5013
slug: require-match-comment-routes-past-sibling
page-type-slug: finding
title: "Require match comment routes past sibling"
domain-slug: domain/code-quality
---

# Claim

The comment on `requireMatch` in `@shared/utils-narrow` tells callers needing positional capture groups to "run `re.exec` directly and validate the slice". `requireMatchPositional` does exactly that and is exported from the same barrel, `@shared/utils-narrow/validate`. So the helper's own documentation routes a caller around a sibling written for their case, toward hand-rolling the boundary read the package exists to concentrate.

# Evidence

At `~/code` `d01942409a`.

`packages/shared/utils/narrow/src/require-match.ts`, the comment above the export:

```
// Convention: `requireMatch` validates *named* capture groups via the
// schema. The regex must declare named groups (e.g.
// `/(?<year>\d{4})-(?<month>\d{2})/`), and the schema must accept the
// `match.groups` shape — typically `z.object({ year: z.string(), ... })`.
// Positional capture groups are unsupported by this helper; callers
// needing them should run `re.exec` directly and validate the slice.
```

`packages/shared/utils/narrow/src/require-match-positional.ts` is the sibling that does it:

```
const RAW_MATCH_SCHEMA = z.array(z.string()).min(1)

export function requireMatchPositional<T extends z.ZodTypeAny>(
  re: RegExp, schema: T, input: string, label?: string
): z.infer<T> {
  let raw: readonly string[]
  try { raw = RAW_MATCH_SCHEMA.parse(re.exec(input)) }
  catch { throw new NarrowError(`requireMatchPositional: no match for ${re}…`) }
  return schema.parse(raw.slice(1))
}
```

`packages/shared/utils/narrow/src/validate.ts` exports both, three lines apart.

Two things beside it, not filed separately. `requireMatchPositional` carries no comment of its own, so the stale sentence on its sibling is the only prose a reader meets about the pair. And the two signatures are identical — `(re: RegExp, schema: T, input: string, label?: string)` — so reaching for the wrong one is a runtime failure rather than a `tsc` one.
