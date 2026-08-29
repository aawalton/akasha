import type { Finding } from "../finding.page-type.ts"

export const nothingTypechecksTheAkashaFolder = {
  id: "01a04dcd-629d-768a-a3b4-c75b38a6251b",
  pageTypeSlug: "finding",
  slug: "nothing-typechecks-the-akasha-folder",
  domainSlug: "domain/akasha-type",
  claim:
    "The root tsconfig names no akasha project and the akasha folder holds no tsconfig of its own, so no compiler reads these files and a page of the wrong shape lands clean.",
  evidence:
    'The root tsconfig.json is solution style: `files` is empty and every checked project arrives through `references`. Its fifty-odd references cover shared, temper, infra, alanwalton and pages-system, and none of them is akasha. There is no tsconfig.json anywhere under akasha either. So `npx tsgo --noEmit -p tsconfig.json`, the command the akasha readme gives and the one agents run before every commit, resolves zero files under akasha and exits zero no matter what those files say. Proved by putting `invariantKind: "totally-bogus-value-here"` into page-type.page-type.ts and then `definition: 12345` into the same page: both exit zero. Running the same files under a throwaway config written by hand did find a real error immediately, a design entry on relation-resolves carrying the intent-only kind gap, which had stood since the kind landed. This makes akasha-type\'s line that a page of the wrong shape does not compile false today, not because the types are weak but because nothing ever runs them. It is worse than an unchecked limit, because the passing command reads as evidence: an agent runs it, sees it exit zero, and reports the shapes verified. Every such report this week was vacuous. The fix is one tsconfig under akasha and one reference to it from the root, needing the bun and node types the modules already import. Until that lands, any claim that akasha typechecks should be read as unmade.',
} as const satisfies Finding
