import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const fiveRowsOfAModelTestsCasesNamePagesThatAreNotThere = {
  id: "01a090d4-ba2a-72b9-8c36-a4b951061fc5",
  type: "finding",
  slug: "five-rows-of-a-model-tests-cases-name-pages-that-are-not-there",
  domain: "page-type/model-test",
  claim:
    "Five rows of the restatement model test's cases name a page under `case-page` that no page carries the slug of, so `relation-resolves` refuses that page. A row beside a page is judged at audit and when the page it sits beside is changed, and neither has happened, so the refusal waits for whoever next touches that test and will read as theirs.",
  evidence:
    "Read 2026-09-11 on the akasha checkout. `akasha audit --check relation-resolves` answers five refusals, every one on `agents/models/tests/pages/restatement/restatement.model-test.ts`, each reading that the page states `cases case-page` and no page admitting `page` carries the slug, then one of `index-stamp`, `indexes`, `akasha-system`, `write`, `move`.\n\nThe same five refuse at `8031e85a8e8`, the commit before the index work landed on 2026-09-11, so they are older than that work rather than made by it. `restatement.model-test.cases.jsonl` was last written in `648fe2d2875` on 2026-09-03 under the message `flatten structure`, and the five slugs read as names a move left behind.\n\nWhat keeps it quiet is where the values sit. `case-page` is a field of `cases`, a `page-property-entry`, so the values are rows in a file beside the page rather than keys in the page. A check at change judges the paths a change carries, and nothing has carried either the test or its rows since. So the refusal is reached only by an audit run by name, or by the next change to that test, which it refuses for a reason that change did not cause.",
} as const satisfies Finding
