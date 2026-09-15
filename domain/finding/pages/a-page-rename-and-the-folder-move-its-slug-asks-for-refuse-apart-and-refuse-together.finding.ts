import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aPageRenameAndTheFolderMoveItsSlugAsksForRefuseApartAndRefuseTogether = {
  id: "01a0a59c-8b00-7000-8590-c3d328505bdd",
  type: "page-type/finding",
  slug: "a-page-rename-and-the-folder-move-its-slug-asks-for-refuse-apart-and-refuse-together",
  domain: "page-type/change",
  claim:
    "A page whose folder is named for its slug cannot be renamed, because the rename and the folder move refuse apart and refuse together.",
  evidence:
    "`cluster-manifests` is a domain sitting in `infrastructure/cluster/manifests`, a folder `folder-matches-a-shape` judges against the slug. Renaming the page alone is refused: the folder `is named `manifests` rather than `manifest`, what `cluster-manifest` calls its folder`. Moving the folder alone is refused the other way: `it is named `manifest` rather than `manifests`, what `cluster-manifests` calls its folder`.\n\nDrafting both into one change is refused by `index-answers-are-level-with-the-change`, in either order. With the move first, the page's `referenced-by` file goes from `manifests/cluster-manifests.domain.referenced-by.jsonl` to `manifest/cluster-manifests…` and then to `manifest/cluster-manifest…`, and the landing says of the middle path `this change lands this index answer, and the change's own files turn no answer there`. With the rename first the middle path is `manifests/cluster-manifest.domain.referenced-by.jsonl` and the same refusal names that. The check reads `change.carried` against `shadow.filed()`, `index-answers-are-level-with-the-change.check-code.decision.code.ts:28-31`, and a path two acts move through is carried without being filed.\n\nThe move no longer repoints a generated body it carries, which was a second fault at the same spot and is mended. What is left is that the paths a change carries are gathered act by act rather than over the change whole, so a chained move is not collapsed.",
} as const satisfies Finding
