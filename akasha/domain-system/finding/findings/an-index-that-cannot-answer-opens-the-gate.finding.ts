import type { Finding } from "../finding.page-type.ts"

export const anIndexThatCannotAnswerOpensTheGate = {
  id: "01a04d65-dcc9-7000-ba3d-3b0798b2b546",
  pageTypeSlug: "finding",
  slug: "an-index-that-cannot-answer-opens-the-gate",
  domainSlug: "domain/checks-system",
  claim:
    "An index holding no check entry lands every change unchecked and says so nowhere, because the runner reads an index that cannot answer as one answering that there are no checks.",
  evidence:
    "Reproduced on a clone. With the index whole, a file carrying a code comment is refused and the call exits 3. Take away `identity/check` alone, leave the rest of the index standing, and the same file is written and committed, exit 0, with no check run and no word said. The path is `checkPagesIn` asking `everyOfType(root, \"check\")`, which answers with an empty list where the directory is not there, then `judgingBy([])`, which refuses nothing, then landing writing and committing on a clean verdict. The state is not exotic. A fresh clone carries no index at all, the data system being written under `.git/data`, which git does not track; and nothing in the repository writes the index either, `rebuiltFrom` and `indexingAt` being imported by their own test and by nothing else, so what stands on disk is kept out of band and one slip from this. With no index whatever the dispatcher refuses, no command being found, so the hole is a partial index rather than a missing one. Four lines name this fault already. Answer Or Refuse says to refuse where you cannot answer rather than answering as though there were nothing, and carries the aid `Never read a missing source as an empty one`. Fail Closed says to fail a check that could not run. Write's page says breaking the glass runs no check and says in the commit that none ran and why; here none ran and the commit says nothing. The functional core intends the akasha system to check every change to itself. The narrow repair is for an absent directory to be told from an empty one, and for a change gathering no check to be refused.",
} as const satisfies Finding
