import type { Finding } from "../finding.page-type.ts"

export const aNarrowedSidecarModeIsDiscardedByTheNextWrite = {
  id: "01a0634b-91e6-7000-a7c0-eeaa0a434a1c",
  pageTypeSlug: "finding",
  slug: "a-narrowed-sidecar-mode-is-discarded-by-the-next-write",
  domainSlug: "workspace-package/pages-system",
  claim:
    "The rescue hatch in `oauth-page-push.ts` writes a plaintext OAuth pair into an account's uncommitted sidecar and then chmods that file to 0600. Every write to a sidecar goes through `writtenAt`, which creates a scratch file at the process umask and renames the scratch over the destination, so each write replaces the destination's mode with 0644. The narrowing lasts only until the next write to that file. All eight account sidecars are mode 644 today.",
  evidence:
    "`akasha/pages-system/page/uncommitted/page-uncommitted.module.code.ts:141-145` — `writtenAt` builds a scratch path `${full}.${process.pid}.${PART}`, calls `writeFileSync(scratch, ...)` with no mode argument, then `renameSync(scratch, full)`. `writeFileSync` creates at 0666 masked by the umask, which reads 0022 on this machine, giving 0644. `keepUncommitted:147`, `mergeUncommitted:152` and `dropUncommitted:160` all write through `writtenAt`.\n\n`tools/lib/oauth-page-push.ts:89-109` — `heldBeside` puts `rescued-credential` holding `accessToken` and `refreshToken` in plaintext through `holdBesideAccount`, then calls `chmodSync(join(akashaRoot(), at), 0o600)` inside a try whose catch is empty. The chmod runs after the write, so the plaintext pair sits at 0644 across the window between those two calls, and returns to 0644 after any later write.\n\n`pushCredentialToPage` calls `holdExpiry` on the pushed path at :213 and on the unchanged path at :174, and `holdExpiry` calls `mergeUncommitted`, so a push that succeeds after a rescue rewrites the sidecar at 0644 while the rescued pair is still there. `dropHeld` at :214 removes the key afterwards. A push that refuses calls neither function, so the pair remains.\n\nMeasured rather than assumed: a file at mode 600 renamed over by a scratch written at the default mode reads 644 afterwards. `umask` answers 0022. Every one of the eight files matching `*.uncommitted.*` under `akasha/agents/claude-accounts/pages/` is mode 644. No sidecar holds `rescued-credential` today, so no token is exposed now.",
} as const satisfies Finding
