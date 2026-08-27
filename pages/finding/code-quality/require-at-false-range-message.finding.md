---
id: 08f76123-7504-5c78-8c77-db7bee50b399
slug: require-at-false-range-message
page-type-slug: finding
title: "Require at false range message"
domain-slug: domain/code-quality
---

# Claim

`requireAt` in `@shared/utils-narrow` decides absence by testing the indexed value against `undefined`, so an array whose element type already includes `undefined` throws on an element that is present. The message it throws is false in that case: it reports `index N out of range (length M)` for an index that was in range, sending a debugger to the caller's arithmetic instead of to the array's contents.

# Evidence

At `~/code` `d01942409a`, `packages/shared/utils/narrow/src/require-at.ts` whole:

```
export function requireAt<T>(array: readonly T[], index: number, label?: string): T {
  const value = array[index]
  if (value === undefined) {
    throw new NarrowError(
      `requireAt: index ${index} out of range (length ${array.length})${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return value
}
```

`T` is unconstrained, so `T = string | undefined` instantiates. For `requireAt(["a", undefined, "c"], 1)` the index is in range, the element is present, and the function throws `requireAt: index 1 out of range (length 3)`.

`length` is already in hand at the throw site, so the two cases are separable — `index < 0 || index >= array.length` is out of range, and anything else reaching the throw is a present `undefined`.

The file's comment says the helper is "Equivalent to `array[index]!` but with a runtime error instead of a silently-`undefined` value escaping `noUncheckedIndexedAccess`", which is the intended contract and does not cover this case either way.

The sibling `requireFirst` and `requireOnly` were not examined for the same shape. The TSTL re-implementation at `packages/temper/shared/build-deploy/tstl/lualib/src/narrow/index.ts` carries a byte-similar `requireAt` with the same message.
