import type { Finding } from "../finding.page-type.ts"

export const isObjectRecordAndIsRecordDifferOnlyOnArrays = {
  id: "01a05cb7-586b-7001-9b6e-14779448c85b",
  pageTypeSlug: "finding",
  domainSlug: "workspace-package/utils-narrow",
  slug: "is-object-record-and-is-record-differ-only-on-arrays",
  claim:
    "utils-narrow carries isObjectRecord and isRecord whose bodies differ only by excluding arrays. A private isRecord in web-app-building was the same rule as isObjectRecord rather than as the module sharing its name, so merging by name would have quietly made build-env parsing stricter. Anyone collapsing the two modules as duplicates changes that caller without seeing it.",
  evidence:
    'is-object-record.module.code.ts:1-3 returns `typeof value === "object" && value !== null`. is-record.module.code.ts:1-3 adds `&& !Array.isArray(value)`. web-app-building.module.code.ts:225-227 held a private isRecord byte-identical to isObjectRecord, and the audit paired it with isObjectRecord rather than with the like-named isRecord, which is the check reading bodies rather than names. A differential over 28 values spanning primitives, plain objects, arrays, typed arrays, functions and classes diverged on exactly the four arrays. Carried through that caller own isEntry the divergence survived on one value: `Object.assign([], { name: "A", value: "v" })` is an entry to isObjectRecord and is not one to isRecord. So the two names are two rules, and the shorter name is the stricter one, which reads backwards. Landed at fb3be57cb3 importing isObjectRecord, which leaves the caller behaviour identical. Whoever tidies utils-narrow should either keep both or rename so the stricter one says what it excludes.',
} as const satisfies Finding
