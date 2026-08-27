---
id: cdc57ba1-3775-5ea4-b7d4-271dacd21cdd
slug: bin-mode-drops-unparsed-package-json
page-type-slug: finding
title: "Bin mode drops unparsed package JSON"
domain-slug: domain/global
---

# Claim

`check-bin-mode` drops a package.json whose JSON is invalid or whose shape fails `PackageJsonSchema`, and the drop is indistinguishable from "this package declares no `bin` field". Its cohort wrapper surfaces the read-failure arm as a gap; the parse and schema arms stay silent, so the check reports a clean pass over a file it could not understand.

# Evidence

Read on main 2026-08-07.

`packages/infra/checks/src/checks/check-bin-mode.ts:46`:

```ts
function parsePackageJson(raw: string): PackageJsonShape | undefined {
  try {
    const result = PackageJsonSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : undefined
  } catch {
    return undefined
  }
}
```

Three distinct outcomes collapse to one value: a `JSON.parse` throw, a schema mismatch, and — through the `catch` — anything else raised on the way. The caller at `:92` is inside the `scan` callback handed to `examineFileCohort`:

```ts
scan: (rel, raw) => {
  const shape = parsePackageJson(raw)
  return shape === undefined ? [] : extractBinTargets(shape, rel)
},
```

So an unparseable package.json contributes zero bin targets, exactly as a package with no `bin` field does, and the check's headline is `All workspace bin targets are mode 100755 in git.`

The cohort wrapper is not the remedy here. `examineFileCohort` takes `pathOf` and hands `scan` the text it read, so it can report a file it could not OPEN. The parse and schema failures happen inside `scan`, after the read succeeded, and nothing in the returned `cohort` distinguishes a file that yielded no targets because it declares none from one that yielded none because it could not be understood.

`Population` on `domains/instrument.md` is what it contradicts: fail where you could not look at a population. `check-bin-mode` stands unsettled in `domains/lists/unresolved-checks.md` with no status recorded against it.

The same class is already filed for a different check at `pages/finding/code-check/bundle-cohort-not-examined.finding.md`; nothing names this one. Carried out of a quarantined document queued for removal, and re-read against the source.
