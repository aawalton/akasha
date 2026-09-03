import type { Finding } from "../finding.page-type.ts"

export const pagesRepoIsTheCheckoutMarkerThePagesSystemFindsACheckoutBy = {
  id: "01a06861-f664-7b21-9c4d-2f7e5a10c001",
  pageTypeSlug: "finding",
  slug: "pages-repo-is-the-checkout-marker-the-pages-system-finds-a-checkout-by",
  domainSlug: "domain/akasha-migration",
  claim:
    "The `pages/repo` folder cannot be migrated or ablated until `checkout-roots` is repointed, because that folder standing in a directory is how the pages system decides the directory is a checkout. Removing it does not degrade one reader; it breaks path resolution for every akasha command, including the `landedMechanically` a migration lands with.",
  evidence:
    'akasha/pages-system/checkout-roots/checkout-roots.module.code.ts:11 holds `const REPO_PAGES = "pages/repo"`. `checkoutFrom` at line 39 walks up from a directory while `namedIn(`${at}/${REPO_PAGES}`)` is empty, so with the folder gone the walk reaches the filesystem root and falls back to `resolve(dir, "..", "..")`. `namedOnDisk` throws outright where the folder holds no `*-repo` page: \'holds no `*-repo` page, so nothing says which repositories there are\'. `repos()` feeds `isAddressable`, `resolveRoots`, `rootsHere` and `locate`, so the throw reaches everything.\n\nThe module\'s own page states it as an invariant: \'A checkout is found by the `pages/repo` folder standing in the checkout.\'\n\n`namedIn` reads the folder with `pageNameOf` and keeps stems ending `-repo`, so the two pages standing there now, akasha-repo and code-editor-repo, are the whole of what names the repositories. The order this has to go in is: teach checkout-roots to find the marker where the repo pages land in akasha, then move the pages, then drop the folder. Doing it the other way costs the swarm its commands.',
} as const satisfies Finding
