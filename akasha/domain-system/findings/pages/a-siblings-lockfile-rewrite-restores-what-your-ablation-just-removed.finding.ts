import type { Finding } from "../finding.page-type.ts"

export const aSiblingsLockfileRewriteRestoresWhatYourAblationJustRemoved = {
  id: "01a0636f-8906-7d06-a1e6-51c0f6cc8997",
  pageTypeSlug: "finding",
  slug: "a-siblings-lockfile-rewrite-restores-what-your-ablation-just-removed",
  domainSlug: "domain/temper",
  claim:
    "The restore-by-sibling race known of the root manifest's workspaces array reaches `bun.lock` too, and there it fools the census a seat runs to confirm its own ablation. Two seconds after my removal took the package out of the lockfile, a sibling's commit put all three entries back; they were gone again a minute later with nobody acting.",
  evidence:
    "On 2026-09-02 I ablated `temper/shared-capture-datamining-addon`. `akasha remove` landed c5eed5c908 at 12:41:28, and that commit's diff deletes all three `shared-capture-datamining-addon` lines from `bun.lock`. At 12:41:30 a sibling landed 0ccf270851 — the watcher's lua block splicing, nothing to do with my package — and `git show 0ccf270851:bun.lock` holds 3 hits for the name. By fac746443b at 12:42:28 it was 0 again and has held there. Nobody repaired it; the next regeneration read a base that no longer held the package.\n\nI nearly misreported. My census, run after the removal's completion notification, found three surviving `bun.lock` references at lines 3152, 3153 and 4399, and I was about to record residue. The same scan minutes later returned zero. Counting hits per commit, rather than reasoning from which commit message looked related, is what exposed the gap: the sibling's subject named the watcher and gave no hint it touched my package.\n\nThe shape: `akasha remove` rebuilds `bun.lock` from the manifests its own base commit tracks, so a concurrent removal rebuilding from an older base reintroduces your entries, with no git conflict, because both wrote one generated file whole. The root `package.json` workspaces row did not flicker in my run — re-read at the end, it held at 0 across 64 entries — so the two structures fail independently and both want checking last.\n\nNot established: whether the lockfile always converges, or only because removals keep arriving. A tree going quiet inside the window would keep the stale entries.",
} as const satisfies Finding
