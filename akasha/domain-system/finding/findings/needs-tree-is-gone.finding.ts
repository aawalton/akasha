import type { Finding } from "../finding.page-type.ts"

export const needsTreeIsGone = {
  id: "01a04bc4-7e86-7bab-a8de-524dd359047a",
  pageTypeSlug: "finding",
  slug: "needs-tree-is-gone",
  domainSlug: "domain/checks-system",
  claim: "A check can no longer ask for the tree, which is a capability taken away rather than rebuilt.",
  evidence:
    "The deleted attempt gave `needs` three values, `path`, `file` and `tree`, and a check asking for the tree was handed every path in the corpus. Six of its fifteen checks asked for it. The rebuilt `needs` offers `path` and `file` only, so those six had to be re-expressed as a judgement about one changed file backed by index lookups. This is what makes the change-driven phases cost what the change is worth, and it is also the one place where the rebuild removes something the old system could do: a check that genuinely needs to see two files at once has no way to say so. Removing a feature was to be brought for authorization rather than decided, so this is the decision to rule on.",
} as const satisfies Finding
