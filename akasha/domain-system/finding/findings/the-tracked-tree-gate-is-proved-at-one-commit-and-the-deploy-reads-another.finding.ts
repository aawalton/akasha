import type { Finding } from "../finding.page-type.ts"

export const theTrackedTreeGateIsProvedAtOneCommitAndTheDeployReadsAnother = {
  id: "01a05b91-7ef1-7e2b-923d-34b13b1a6ebd",
  pageTypeSlug: "finding",
  slug: "the-tracked-tree-gate-is-proved-at-one-commit-and-the-deploy-reads-another",
  domainSlug: "page-type/web-app",
  claim:
    "The tracked-tree install gate is sound, but an agent proves it at whatever HEAD stood when it ran, and `akasha deploy` reads HEAD again for itself. Where lanes land every few minutes those are different commits, so a green gate says nothing about the commit actually pushed and built. The gate belongs inside the deploy, against the commit it is about to push.",
  evidence:
    'The gate was proved green at `d5099618f9`: the tracked manifests plus `bun.lock` archived into an empty directory, `bun install --frozen-lockfile`, exit 0. `akasha deploy alanwalton-web` then read HEAD itself, pushed `6f1603e2b1`, and the in-pod build failed with `Workspace not found "shared/design-forms"` at `package.json:69`. The gate had no hole: replayed at `6f1603e2b1` it reproduces that error exactly, exit 1. Between the two commits, `9bf6f8ce52` took `shared/design-forms` away once akasha held it while the root `package.json` still named it in workspaces, and `28d0d932da` then removed the stale entry. The deploy read HEAD inside that window. The failure was harmless because the build runs inside the already-running pod: `web-77744999b8-zr6rh` stayed 2/2 Running on its old build, no new pod was made, the deploy revision stayed 1431, and alanwalton.com never left 200. A second deploy, gated at `283599af2e` and fired at once, landed as revision 1432. The call taken in Alan\'s absence was to redeploy rather than stop, on the evidence that the entry was already repaired at HEAD and that a failed in-pod build cannot take the site down.',
} as const satisfies Finding
