import type { Finding } from "../finding.page-type.ts"

export const akashaWouldRatherNotMutate = {
  id: "01a05022-3aa0-7837-ae96-152ad1f294ee",
  pageTypeSlug: "finding",
  slug: "akasha-would-rather-not-mutate",
  domainSlug: "domain/checks-system",
  claim:
    "The old readonly-collections rule guards four boundary positions and would cost five sites here, but the reason behind it argues much further: a value nobody can change is a value that can be reasoned about where it stands. Carried through the corpus that is 183 local arrays and 418 mutating calls across 110 of 562 files. It is a commitment about what akasha is written in, not a check to port.",
  evidence:
    "The old scanner covers `T[]`, `Array<T>` and tuples in four escape positions: parameter, return type, property signature, type alias body. Over akasha it finds five. Two are outward leaks — `sentOn(...): Found[]` and `type Asking = { readonly stated: Stated[] }`, where the property is held fast and the array inside it is not. Three are accumulators: `underneath(..., found: string[])` twice and `takenIn(source, said: string[])`, each filled by `.push` in a recursive walk. So the boundary rule is nearly satisfied already, and satisfying it fully would mean those three walks returning what they find rather than filling what they are handed. Inside function bodies nothing is guarded at all: 183 declarations of `const x: T[] = []`, 418 calls to push, pop, splice, sort and their kin, 110 `let` bindings, and 122 mutations of a Set or Map. The scanner reaches none of it, and it reaches no Map or Set even at a boundary, so a mutable Map handed out would pass the rule as written. Two shapes carry almost all of it: a walk filling an array it was given, and a function building a local array and returning it. The second is invisible to callers and is the cheaper half to leave alone. One place would genuinely fight: the cycle detection in `no-import-cycle` is Tarjan's algorithm, which is stateful by construction, and a version that copies instead is markedly worse. The boundary-only rule stays available as a smaller step if the whole is not taken.",
} as const satisfies Finding
