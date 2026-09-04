import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AuthorityCertificate } from "./properties/authority-certificate.named-file-property.ts"

export type CertificateAuthority = Domain & {
  authorityCertificate: AuthorityCertificate
}

export const certificateAuthority = {
  id: "01a0685d-ab5d-7bd4-946d-fa56b367a1a2",
  pageTypeSlug: "page-type",
  slug: "certificate-authority",
  definition: "who signs the certificates a set of names is trusted on",
  pluralSlug: "certificate-authorities",
  partSlugs: ["named-file-property/authority-certificate"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "authority-certificate", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An authority's certificate is held in a file beside the page.",
    },
    {
      invariantKind: "constraint",
      statement: "An authority's signing key is never beside its certificate.",
    },
    {
      invariantKind: "departure",
      statement: "An authority whose key is gone is a new authority rather than the same one.",
    },
  ],
} as const satisfies PageType
