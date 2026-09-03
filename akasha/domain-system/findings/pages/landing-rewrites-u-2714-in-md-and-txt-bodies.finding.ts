import type { Finding } from "../finding.page-type.ts"

export const landingRewritesU2714InMdAndTxtBodies = {
  id: "01a065a1-20e0-7000-9639-e9ac44fee294",
  pageTypeSlug: "finding",
  slug: "landing-rewrites-u-2714-in-md-and-txt-bodies",
  domainSlug: "domain/akasha-migration",
  claim:
    "`landedMechanically` rewrites U+2714 to U+221A in every `md` and `txt` body it lands. The byte length holds, no refusal is said, and the same body at a `json` path is untouched.",
  evidence:
    "A nine-byte probe holding U+2714: at `md` and `txt` it went in e29c94 and came back e2889a; at `json` it came back unchanged. It corrupted 1 of 703 chapters carried in.",
} as const satisfies Finding
