import type { Finding } from "../finding.page-type.ts"

export const akashaWriteLandsANewPackageWithoutLinkingIt = {
  id: "01a062f8-6fdd-78f9-94a9-642360156ba8",
  pageTypeSlug: "finding",
  slug: "akasha-write-lands-a-new-package-without-linking-it",
  domainSlug: "domain/akasha",
  claim:
    "akasha write lands a new workspace package and remakes bun.lock, but creates no node_modules/@akasha link for it. The next package importing it cannot resolve it, so a recreation that lands as two packages refuses on the second with TS2307 naming the first. Nothing in the akasha commands closes this, and bun install is barred on the migration, so a seat landing a multi-package recreation stalls until someone makes the link by hand.",
  evidence:
    "temper-build-hash landed at 5f5d870560 carrying its own package.json, and the commit remade bun.lock. Afterwards node_modules/@akasha/temper-build-hash did not exist, while node_modules/@akasha/temper-bit-codec, an older package, was a symlink to ../../akasha/temper/temper-bit-codec. The root manifest globs akasha/** into its workspaces, so the package was a declared member the whole time. A dry run of the second landing then refused with TS2307 Cannot find module @akasha/temper-build-hash/build-hash-bit-reader on eighteen files. Making the three symlinks by hand cleared it and the landing passed 40 checks over 58 paths at ed6c66475e. A symlink under node_modules is ignored, untracked build state and is not bun install: no network, no lockfile change, no version resolution. What was not checked is which command ought to own the linking, or whether the deploy path makes the link some other way.",
} as const satisfies Finding
