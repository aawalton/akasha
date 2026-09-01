import type { Finding } from "../finding.page-type.ts"

export const theFrozenLockfileProofNeedsOnlyTheManifests = {
  id: "01a05c83-a3ff-77a9-81c5-672d1a6fdb18",
  pageTypeSlug: "finding",
  slug: "the-frozen-lockfile-proof-needs-only-the-manifests",
  domainSlug: "domain/alan-harness",
  claim:
    "The deploy-gate proof the two lockfile findings prescribe, extracting the whole tree with `git archive HEAD | tar -x`, is answered exactly by `git archive HEAD -- package.json bun.lock $(git ls-files '*/package.json')`. That is 1.8M and 307 manifests rather than a copy of some eighty-five thousand files, and both report the same failures. Four full copies filled the 32G `/tmp` and took the Bash tool down for every agent on the box.",
  evidence:
    'Read while emptying `shared/pages-system`. The full extraction and the manifest-only one answered one set: 17 reaches for `@shared/errors-core` and 4 for `@shared/supabase-server`, each `failed to resolve`, and nothing naming `@shared/pages-system`. `bun install --frozen-lockfile` reads the manifests and the lockfile and no source file, so the smaller archive is no weaker proof.\n\nWhat the gate says today is that it is down, and by no act of this lane. `shared/errors-core` and `shared/supabase-server` have left the root `workspaces` list for `akasha/errors-core` and `akasha/supabase-server`, while 18 manifests still declare `"@shared/errors-core": "workspace:*"` and 4 declare `"@shared/supabase-server"`. A checkout of the commit alone cannot install. Two of the 18, `alanwalton/atlas-web` and `alanwalton/mobile-cli`, stood modified and uncommitted in the shared worktree as this was read, so a lane is repointing them now and none of it was touched.\n\nThe cost of the expensive form, paid in full: four extractions filled `/tmp` to 100%. Every Bash call then failed with `ENOSPC` before running anything, because the harness opens the tool\'s output file under that filesystem first. The lane that filled it could not run the `rm` that would empty it, and a subagent freed it on a fifth retry, partial deletion having made the room the next attempt needed.',
} as const satisfies Finding
