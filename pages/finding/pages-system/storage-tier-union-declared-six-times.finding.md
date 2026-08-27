---
id: 7bc6de2b-d879-5f49-9ecf-bfcd3a912385
slug: storage-tier-union-declared-six-times
page-type-slug: finding
title: "Storage tier union declared six times"
domain-slug: domain/pages-system
---

# Claim

The storage-tier vocabulary `"indexed" | "content" | "external"` is written out six times and nothing joins any two. Five copies are TypeScript, where a stale one fails at the first call site crossing two of them. The sixth is a plpgsql allowlist inside the materializer, and it cannot fail that way: its `ELSE '{}'::jsonb` arm drops the key rather than raising, so a tier added to the unions and not to that list is accepted at the boundary and silently absent from what every write-path guard reads.

# Evidence

Read in `~/code` on `main` at `1313565199`, ingesting `dirty/questions/code-repo-restated-values.md`.

Three copies as a bare union:

- `packages/shared/pages/core/src/types.ts:67` — `readonly storage?: "indexed" | "content" | "external"`
- `packages/shared/pages/access/src/page-type-config.ts:30`
- `packages/shared/utils/sync/src/ensure-page-types.ts:102`

Two as a Zod enum, both inside `pages/core` where an import is free:

- `packages/shared/pages/core/src/schema/pages.ts:112` — `storage: z.enum(["indexed", "content", "external"]).optional()`
- `packages/shared/pages/core/src/schema/property-definition.ts:142` — identical

The sixth is plpgsql, at `packages/shared/pages/proc/src/_build_property_definitions.ts:100`:

    || CASE WHEN w.attrs->>'storage' IN ('indexed','content','external')
       THEN jsonb_build_object('storage', w.attrs->'storage') ELSE '{}'::jsonb END

Three of the five TypeScript copies sit inside `pages/core` itself, so the duplication is not a package boundary being respected.

The asymmetry is the point. A TypeScript copy left behind is caught by the compiler at the first crossing — noisy and early. The plpgsql arm is the materializer, and its `ELSE` drops the key instead of raising, so the failure is silent and downstream: a new tier parses at the definition-tier boundary, lands on the property-definition row, and is missing from the `propertyDefinitions` blob the write-path guards read. The declaration is accepted and inert.

No test holds the plpgsql list against any union, and no check compares the six. Whether the TypeScript copies should collapse to one exported union, and whether the plpgsql list should be derived from it or pinned to it by a test, is unjudged here.
