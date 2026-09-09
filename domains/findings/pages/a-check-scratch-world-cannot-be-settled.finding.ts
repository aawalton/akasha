import type { Finding } from "../finding.page-type.types.ts"

export const aCheckScratchWorldCannotBeSettled = {
  id: "01a08276-3c87-746a-bbe3-8ffc21c0f7ab",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-check-scratch-world-cannot-be-settled",
  domain: "module/check-scratch",
  claim:
    "A world `typed()` builds cannot be settled, so a check test proving move behaviour on that world proves nothing.",
  evidence:
    "`typed()` writes page bodies carrying neither `id` nor `pageTypeSlug` and hand-files the listing beside them. `shadowFor` over a move in such a world answers zero filings. Found while mending the test world's stale index in `e4f5f21bdd`, whose own regression test had to build a real indexed world because this fixture could not carry it.",
} as const satisfies Finding
