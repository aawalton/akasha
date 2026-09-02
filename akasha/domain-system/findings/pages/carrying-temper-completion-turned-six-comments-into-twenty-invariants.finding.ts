import type { Finding } from "../finding.page-type.ts"

export const carryingTemperCompletionTurnedSixCommentsIntoTwentyInvariants = {
  id: "01a06428-7ccb-7384-bdd4-a6b3c24f73ca",
  pageTypeSlug: "finding",
  slug: "carrying-temper-completion-turned-six-comments-into-twenty-invariants",
  domainSlug: "domain/temper",
  claim:
    "Six comment blocks across five of temper's completion components could not land, and what they said is now twenty invariants on the five module pages. Nothing they said was lost, and two things changed shape: a sentence joining two facts had to be split, and a sentence leaning on a pronoun or a demonstrative had to name what it meant.",
  evidence:
    "`akasha write` answered `line N carries prose, which is none of the code comment forms` for 21 lines over `account-progress`, `character-achievements-panel-card`, `character-progress`, `use-completion-catalogs` and `use-completion-progress`. The precedent for the remedy is the finding `no-comment-the-item-rules-source-carried-came-across`, where the same refusal was met by stripping the comments and putting what they stated onto the page as invariants.\n\nThe rewrite was refused twice more before it landed. `lone-determiner` refused `That tally is built from...`; `lone-pronoun` refused `...rather than after them` and `...makes the assertion after it true`; `lone-quantifier` refused `stamps each entry with an id none of these catalog types name`; and `joins a second fact at ,` refused three sentences that had to become six.\n\nOne comment could not become an invariant and became a code change instead. `use-completion-catalogs` narrowed store rows and then wrote `as unknown as readonly T[]` ten times, which `no-double-cast` refuses. The private helper `slim` now says it gives back `readonly unknown[]`, and each of the ten sites asserts once. What the comment said about why the narrowing makes the assertion true is an invariant on the page.",
} as const satisfies Finding
