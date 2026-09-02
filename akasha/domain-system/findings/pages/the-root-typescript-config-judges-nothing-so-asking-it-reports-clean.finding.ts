import type { Finding } from "../finding.page-type.ts"

export const theRootTypescriptConfigJudgesNothingSoAskingItReportsClean = {
  id: "01a063f8-2c60-7000-b7a4-6d1e0f3a9c85",
  pageTypeSlug: "finding",
  slug: "the-root-typescript-config-judges-nothing-so-asking-it-reports-clean",
  domainSlug: "domain/akasha",
  claim:
    "`tsc --noEmit -p tsconfig.json` at the repository root answers clean while a deliberate type error sits in the tree. The root config carries `references` and neither `files` nor `include`, so it composes other projects rather than judging any source of its own, and asking it directly judges nothing. The answer is a true statement about an empty set, and it reads exactly like a green check.",
  evidence:
    "Found 2026-09-02 by a seat repointing the two ESO name censuses, and confirmed by me afterwards. `tsconfig.json` at the root opens with `references` naming `./shared/pages-query`, `./temper/scripts`, `./infra/k8s` and the rest, and carries no `files` and no `include`. TypeScript treats such a config as a solution to build, not as a program to check, so `-p` against it has no source to judge.\n\nThe seat did not infer this from the config shape. It put a type error in place and asked, and the answer came back clean — then asked `-p tools/tsconfig.json` with the same error in place and got the error. That is the difference between reading a config and testing an instrument, and only the second would have caught it.\n\nWhat makes this worth recording rather than merely noting is who is exposed. Running `tsc` by hand is refused by a hook for most agents here, so the ones who reach for it are the ones working outside `akasha/` where the hook does not reach — exactly the seats whose work no other check judges either. A seat that proves its change safe this way has proved nothing, and the transcript will show a green verdict.\n\nThe working instrument is `akasha audit --check typecheck`, which judged 31,407 files with none refused when I ran it tonight, and which says plainly of itself that it is not an audit because the other 40 checks judged nothing. A per-package `tsc -p <package>/tsconfig.json` also judges real files. What must not be trusted is the bare root.",
} as const satisfies Finding
