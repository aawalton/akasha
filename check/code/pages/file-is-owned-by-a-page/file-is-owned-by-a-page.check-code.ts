import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const fileIsOwnedByAPage = {
  id: "01a0a5ad-d1e4-73c6-a833-d7a166ad8a9b",
  type: "check-code",
  slug: "file-is-owned-by-a-page",
  definition: "the check refusing a file that belongs to no page",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file the tree holds is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing under the index is judged, because no page owns what the index derives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git ignores is judged only where a page holds that file uncommitted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file's owner is worked out from that file's name against what the page types declare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's own file is owned by that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file whose name carries a page type is owned by the page that name states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file a page type names is owned by a page of that type in the folder where that name begins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Everything beneath a folder a page type names is owned by the page naming that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file whose name states a page that is nowhere is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file some page owns is let through, whatever that file holds.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No list in this check names a file let through.",
    },
  ],
} as const satisfies CheckCode
