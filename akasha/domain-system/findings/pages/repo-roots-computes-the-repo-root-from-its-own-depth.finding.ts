import type { Finding } from "../finding.page-type.ts"

export const repoRootsComputesTheRepoRootFromItsOwnDepth = {
  id: "01a05c3d-1374-7558-ac9e-08a81d7207cc",
  pageTypeSlug: "finding",
  slug: "repo-roots-computes-the-repo-root-from-its-own-depth",
  domainSlug: "domain/akasha-migration",
  claim:
    "A package boundary drawn around repo/roots/roots.ts is cheap by file count and dear by risk. Its closure is 5 files and 343 lines carrying one refused construct, but CHECKOUT_HERE is resolve off roots.ts's own location two directories up, so moving the file silently repoints the repo root that 298 files reach. AKASHA_ROOT masks it wherever it is set, which is every cluster deployment, so the wrong answer shows only on a bare workstation.",
  evidence:
    "roots.ts stands at repo/roots/roots.ts and checkoutHere() answers resolve(dirname of import.meta, '..', '..'), which is the checkout root only while the file sits exactly two directories down. Moved to akasha, the same arithmetic answers the akasha folder instead. HERE is that value unless AKASHA_ROOT is set, and rootBeside, rootOf, ownRepoRoot, rootsHere and resolveRoots all pivot on HERE, so every path the repo resolves would move one level in.\n\n298 files reach roots.ts, around a hundred spelling it without an extension, so a grep anchored on the file name undercounts. Nothing reaches it by a runtime string. Both alanwalton web deployments name AKASHA_ROOT in their pod env and infra's shell scripts default it to a home path, so the wrong answer is masked exactly where the work is verified and appears on a bare workstation run. page/index/place/place.ts carries a second independent copy of the same AKASHA_ROOT rule down to the refusal wording.\n\nThe closure is otherwise small and clean: page/document/types.ts at 65 lines, page/name/name.ts at 26, page/page.ts at 15 and repo/path/path.ts at 47 all pass a scan for void, class, enum, re-export, comments and module-level let, and roots.ts at 190 fails only on `let held`. Each would also want its own module page under file-has-its-page, so five code files land as ten. The file count is not what makes this dear. Re-deriving the root arithmetic beneath 298 reachers is, and the error mode is silent.",
} as const satisfies Finding
