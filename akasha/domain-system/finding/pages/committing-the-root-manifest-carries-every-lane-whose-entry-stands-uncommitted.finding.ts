import type { Finding } from "../finding.page-type.ts"

export const committingTheRootManifestCarriesEveryLaneWhoseEntryStandsUncommitted = {
  id: "01a05c01-30ae-7eb8-a866-66e231ae1db6",
  pageTypeSlug: "finding",
  slug: "committing-the-root-manifest-carries-every-lane-whose-entry-stands-uncommitted",
  domainSlug: "domain/akasha-migration",
  claim:
    "A lane adding its package to the root manifest cannot commit that file alone. `block-git-writes` takes only `git commit -- <path>`, which reads the worktree rather than what is staged, so a staged-only change is refused and every other lane's uncommitted workspace entry lands under the committing lane's message. Two commits tonight carried four entries their messages did not name.",
  evidence:
    "Landing chess-core needed one line in the root manifest. At 01:50 the worktree held four additions over HEAD: akasha/chess-core, akasha/design-primitives, akasha/drive-google, and akasha/health-samples-day replacing alanwalton/health-samples-day. Nothing was staged, so none of it could be unstaged. Building the two blobs with `git hash-object -w` and placing them with `git update-index --cacheinfo`, then `git commit` with no paths, was refused: block-git-writes said a commit must name its paths after `--`. Naming paths reads the worktree, so 2ebce5640d carried three other lanes' entries and 39ef4bc318 later carried akasha/tower, which another lane had landed minutes before at c6d5b74afd. Nothing was lost and nothing broke: all four added paths held a manifest, and `bun install --frozen-lockfile --dry-run` exited 0 afterwards. The cost is attribution, not content. The one way to commit only my own line was to write HEAD's body back over the worktree first, which would have deleted three lanes' uncommitted work, so it was not taken. This is structural rather than a race that can be won by timing: the root manifest cannot share a commit with files under akasha, which forces every lane to make this separate commit, and each lane's entry sits in the shared worktree between landing its package and committing that file. With nineteen lanes it recurs once per package. Whoever commits the manifest next necessarily carries whatever is pending. A reader of `git log` cannot tell which lane added which workspace entry from the commit that carries it.",
} as const satisfies Finding
