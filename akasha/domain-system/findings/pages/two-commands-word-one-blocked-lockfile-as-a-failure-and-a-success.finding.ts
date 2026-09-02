import type { Finding } from "../finding.page-type.ts"

export const twoCommandsWordOneBlockedLockfileAsAFailureAndASuccess = {
  id: "01a062a7-8a88-7777-8a39-dc5a6c254cc8",
  pageTypeSlug: "finding",
  slug: "two-commands-word-one-blocked-lockfile-as-a-failure-and-a-success",
  domainSlug: "domain/temper",
  claim:
    "`akasha remove` and `akasha edit` meet one condition and word it opposite ways. Where the root manifest names a workspace no directory holds, neither bun nor akasha can make the lockfile again. `remove` reports that the lockfile could not be made again and went unchanged, naming neither the manifest at fault nor the missing workspace. `edit` on a tree without that fault reports the lockfile was made again. A reader takes the first for a note in passing, and it is a build no one can run.",
  evidence:
    '`akasha remove --file-path temper/game-items-filters-addon --dry-run` answered "this change carries 2 `package.json` and `bun.lock` could not be made again from the manifests at <sha>, so the lockfile went unchanged — a manifest parted from its lockfile refuses every install, and the tree will not install until the lockfile follows". The same wording came back at four different base commits over one session. `akasha edit` carrying two manifests answered "`bun.lock` was made again beside the 2 `package.json` this change carries, and lands in the same commit". Both were true. The tree held an orphaned `workspaces` row at every moment `remove` was asked and held none when `edit` was asked. A seat reading only the two messages concludes the regeneration path is broken in one command and sound in the other, and files that. This one did, and withdrew it. What the message owes its reader is the manifest it could not read and the workspace it could not find, which is what `bun install` itself says and what resolved this in one line. The capability itself landed at `919be4c20a` and works.',
} as const satisfies Finding
