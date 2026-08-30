import type { Finding } from "../finding.page-type.ts"

export const untypedInputIsAssertedRatherThanParsed = {
  id: "01a05013-91f7-750d-bdd0-9e5ca9565f85",
  pageTypeSlug: "finding",
  slug: "untyped-input-is-asserted-rather-than-parsed",
  domainSlug: "domain/checks-system",
  claim:
    "Where akasha reads input it cannot see the type of, it asserts a shape rather than deriving one. Two of the old syntax scanners point at this one seam from opposite sides and would refuse 107 sites between them. Neither can be carried until there is something to validate with, so what is missing is a parsing layer and not a check.",
  evidence:
    "Measured with the old scanners' own AST walk over the live corpus. `type-assertions` finds 68 in 34 files, all `as T` now that the two double casts are gone. `boundary-parse` finds 39 in 27 files: 30 at `JSON.parse`, 5 at `process.env`, 4 at a regex capture. They overlap because they are one observation seen from two sides — one names the assertion, the other names the unparsed boundary it stands at. Four boundaries carry nearly all of it. A dynamic module load, `loadFrom(at) as Record<string, unknown>`, about ten sites, because `createRequire` answers `any`; then a second assertion narrowing the export to a contract, `named as Running`, `as Answering`, `as Judging`, `as Checking`, `as Surface`. A JSON line off an index or a git answer, `JSON.parse(line) as Partial<Schema>`. The environment, `{ ...process.env } as Record<string, string>`. A regex capture read for groups that may not be there. `checking.module.code.ts` holds the pattern whole: load, assert a record, assert a function, run it. This is the page system loading a page at runtime, which is what akasha is, so the assertions are the architecture showing through rather than carelessness — but the type they claim is unchecked at the one place untrusted bytes arrive. What would carry the rule is a parser at each boundary answering a value or a refusal, which is a design decision with a migration behind it. One piece was separable and has been taken already: the double cast through `unknown` is a refusal to be checked rather than an assertion at a boundary, it stood at only two sites, and both are gone.",
} as const satisfies Finding
