import type { Finding } from "../finding.page-type.ts"

export const aShellCallUndoesAnotherLanesWork = {
  id: "01a05c05-b332-7adb-b5be-962d24c8b928",
  pageTypeSlug: "finding",
  slug: "a-shell-call-undoes-another-lanes-work",
  domainSlug: "workspace-package/hook-system",
  claim:
    "restore-akasha-when-dirty runs after every shell call of every agent and puts every uncommitted path under akasha/ back as HEAD has it. One worktree now holds many lanes at once, so a lane's read or git call destroys another lane's in-flight work. Seven files under akasha/drive-google were put back at least five times tonight by three lanes that never wrote them. The call taken while Alan slept: the hook was left alone and the loss was reported.",
  evidence:
    "The hook answers `restore-akasha-when-dirty: this call left the akasha folder changed outside the gate` and lists what it put back. The same seven paths came back each time: drive-google/drive-auth/drive-auth.module.code.ts and .module.ts, drive-client/drive-client.module.code.ts and .module.ts, drive-credentials/drive-credentials.module.code.ts and .module.ts, and drive-file-schema/drive-file-schema.module.code.ts. Three lanes saw it independently and none of them had written a drive-google file: this lane twice, once after a `grep` and once after an `akasha read`; a pages-core lane once after a `git log`/`git show`; a pages-query lane twice. It fires on calls that write nothing at all, so no discipline about writing through the akasha commands protects a lane from it. It is also made worse by the advice given for the landing lock: waiting out `.git/akasha-landing.lock` by polling from a second lane means that second lane keeps running shell calls, and each one reverts whatever the holder of the lock has staged on disk but not yet committed. The hook is right that akasha/ should never be left dirty, and it was right when one agent held the worktree. What has changed is the number of lanes, not the rule. Nothing here was altered: the hook is a check on writers rather than a code check, but what it refuses and what it undoes is the same kind of decision Alan Approves Checks reserves, and the fix wants a choice between a lock the hook honours, a per-lane worktree, and a hook that reverts only what the calling lane itself wrote.",
} as const satisfies Finding
