import type { Finding } from "../finding.page-type.ts"

export const thePageTypeCheckCannotSeeAFieldWhoseKindVaries = {
  id: "01a061b0-5cba-71a3-8a73-fadac21564fe",
  pageTypeSlug: "finding",
  slug: "the-page-type-check-cannot-see-a-field-whose-kind-varies",
  domainSlug: "workspace-package/checks",
  claim:
    "What judges an entry reads the name of each field a row states and never the kind of value that field holds. A field declared as a number holding text, and a field declared as a record holding text, are both answered clean. Nothing descends into a nested object either, so a shape declares named fields and the fields inside a value are judged by nothing. An entry shape therefore asserts a kind no check ever tests.",
  evidence:
    'Read on 2026-09-02 in akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.code.ts. `fieldsOf` at :100-135 looks up `fields.get(inner)` by name alone, and the only tests it then applies to a value are `overMax` and `offFormat`. `overMax` at :48-52 opens `if (typeof said !== "string" || max === null) return null`, and `offFormat` at :54-63 opens with the same guard, so a number, a boolean and an object each leave both tests at once. No branch of the function asks what kind `stated` is, and the loop at :129 hands `each` to those two scalar tests rather than recursing, so a nested object is never opened. A number property declares `max` and no kind, and a record property declares named fields the entry path never reaches. Live instances landed the same night: `effect` text on 9 entries against a record property, and `value` the string `reset` on 1 entry against a number property, over 436 entries in temper-companion-skill, none refused. Filed as `two-companion-skill-effect-fields-hold-two-kinds-each`. The sibling claim about a required field a row omits is `a-required-entry-field-is-declared-and-never-checked`, whose evidence has no headroom to carry this one. Widening a check to refuse more is reserved to Alan, so this is filed rather than mended.',
} as const satisfies Finding
