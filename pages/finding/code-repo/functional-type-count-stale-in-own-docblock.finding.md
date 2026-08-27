---
id: 9f6579b4-3331-5826-973f-f80952c41db4
page-type-slug: finding
title: "Functional type count stale in own docblock"
domain-slug: repo/code-repo
---

# Claim

The docblock of `check-functional-type.ts` states the size of the functional-type vocabulary twice at ten and once, in its opening sentence, at nine. Ten is right, pinned by a test. The array it counts is not in this file.

# Evidence

At `~/code` on `main`, `13135651993c19af09ce41b6295264191071d3c1`, `packages/infra/checks/src/checks/check-functional-type.ts` disagrees with itself inside one comment block:

- `:6` — "whose value is one of the nine declared types in Functional Type".
- `:28` — "**InvalidFunctionalType** — field present but value is not one of the ten declared types."
- `:30-31` — "**MismatchedFunctionalType** — declared value is one of the ten but the discriminator chain infers a different value."

Ten is the live figure. `FUNCTIONAL_TYPES` is declared at `packages/infra/checks/src/lib/functional-type.ts:30`, and `functional-type.unit.test.ts:29` pins it — `expect(FUNCTIONAL_TYPES.length).toBe(10)`. So the opening sentence, which is the one a reader takes the number from because it is the file's stated purpose, carries the stale count while the two failure-mode entries below it are current.

The array is in a sibling module rather than in this file, so the count here is a restatement with nothing comparing the two. The test pins the array's length against a literal, not against any prose, and no check reads comments — a green run says nothing about either sentence.

The citation that used to carry the authority is gone as well. The docblock now reads "declared types in Functional Type", a bare name with no path; the `.claude/docs/functional-type.md` route it once named does not resolve, `.claude/` holding only `.mcp.json` among tracked files.

Found ingesting a quarantined question document, which recorded this instance as sitting "inside the file that holds the canonical array" — it does not.
