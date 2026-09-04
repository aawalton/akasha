import type { Finding } from "../finding.page-type.ts"

export const clusterManifestsIsInNoLockfileSoNotOneOfItsExportsResolves = {
  id: "01a06864-8745-7002-b395-badb00913cfa",
  pageTypeSlug: "finding",
  slug: "cluster-manifests-is-in-no-lockfile-so-not-one-of-its-exports-resolves",
  domainSlug: "domain/akasha-migration",
  claim:
    "@akasha/cluster-manifests is named by no row of bun.lock and stands under no link in node_modules, so every import of it fails to resolve at run time while typechecking and `bun build` on the files themselves pass. This predates the RBAC migration — akasha/service-system and infra/scripts already declared it as a dependency — and it is what makes `akasha cluster-rbac-manifest` unrunnable on a fresh checkout until an install succeeds.",
  evidence:
    "`grep -c 'akasha/infrastructure/cluster-manifests' bun.lock` returns 0 and `ls node_modules/@akasha/` holds no cluster-manifests entry, while workflow-language and k8s-synth both stand there as symlinks dated when their lanes landed.\n\nThe break is not new work: `bun -e 'import(\"@akasha/cluster-manifests/cnpg-cluster\")'` — an export that has stood since 01a06810-1263-7296-86ac-72d2a283e164 was written — refuses with the same message as the modules landed today. Two package manifests outside the package already name it as `workspace:*`.\n\nThe root cause is the install that cannot run, which the finding on two manifests claiming @akasha/infrastructure-commands already records: every landedMechanically call carrying a package.json reports that the lockfile could not be made again and went unchanged. Nothing here is repaired by editing the package; what repairs it is one `bun install` after the duplicate workspace name is resolved.\n\nVerified locally by making the link `bun install` would make, after which the command loaded and ran. node_modules is ignored, so that link is not part of any change.",
} as const satisfies Finding
